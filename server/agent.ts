import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Connect, Plugin } from 'vite'
import { formatEntries, knowledge, searchKnowledge } from './knowledge.ts'
const DEFAULT_BASE_URL='https://integrate.api.nvidia.com/v1', DEFAULT_MODEL='nvidia/nemotron-3-ultra-550b-a55b'
const MAX_BODY_BYTES=128*1024, MAX_HISTORY=8, MAX_MESSAGE_CHARS=4000
const COMPANY_INSTRUCTIONS=`You are the Ikasle Super Intelligence agent. Answer questions about Ikasle using the supplied company knowledge.
Rules:
- Only state Ikasle facts found in the supplied company knowledge. Never invent prices, clients, timelines, certifications, or features.
- If company knowledge does not cover an Ikasle question, say so and suggest the "Talk to our team" button.
- Be concise and practical.`
const GLOBAL_INSTRUCTIONS=`You are a helpful global knowledge assistant.
Answer the user's general question from your model knowledge. Clearly say when information may not be current.
Answer questions about people, places, news, weather, sports, prices, schedules, technology, and other general topics directly.
Never redirect a general question to the Ikasle team. Be concise and mention useful source names when available.`
export type ChatTurn={role:'user'|'assistant';content:string}
export type AgentEvent={type:'status'|'text'|'error';text:string}
export type AgentConfig={apiKey:string;baseUrl:string;model:string}
type NVIDIAResponse={choices?:Array<{message?:{content?:string}}>;error?:{message?:string}}
class AgentError extends Error{}
function errorMessage(status:number,model:string){
 if(status===400)return 'NVIDIA rejected the request. Check the selected model and tool configuration.'
 if(status===401||status===403)return 'NVIDIA rejected the API key. Check NVIDIA_API_KEY in .env.local.'
 if(status===404)return `NVIDIA could not find the model "${model}". Check NVIDIA_MODEL in .env.local.`
 if(status===429)return 'The NVIDIA API rate limit was reached. Please try again shortly.'
 if(status===503)return 'NVIDIA is temporarily unavailable. Please try again in a moment.'
 return `The NVIDIA API returned an error (${status}). Please try again.`
}
function context(history:ChatTurn[]){
 const query=[...history].reverse().find(t=>t.role==='user')?.content??''
 const matches=searchKnowledge(query)
 return formatEntries(matches.length?matches:knowledge)
}
function isCompanyQuestion(question:string){
 return /\b(ikasle|your company|your business|your services|ai solutions|knowledge assistant|document intelligence|talk to (your|the) team)\b/i.test(question)
}
export async function runAgent(history:ChatTurn[],config:AgentConfig,emit:(e:AgentEvent)=>void,signal:AbortSignal){
 const question=[...history].reverse().find(t=>t.role==='user')?.content??''
 const companyQuestion=isCompanyQuestion(question)
 const instructions=companyQuestion?`${COMPANY_INSTRUCTIONS}\n\nCompany knowledge:\n${context(history)}`:GLOBAL_INSTRUCTIONS
 emit({type:'status',text:companyQuestion?'Checking Ikasle knowledge':'Preparing answer'})
 const response=await fetch(`${config.baseUrl}/chat/completions`,{
  method:'POST',headers:{Authorization:`Bearer ${config.apiKey}`,'Content-Type':'application/json'},
  body:JSON.stringify({
   model:config.model,
   messages:[{role:'system',content:instructions},...history],
   temperature:.3,max_tokens:600,stream:false,chat_template_kwargs:{enable_thinking:false}
  }),signal
 })
 const result=await response.json().catch(()=>null) as NVIDIAResponse|null
 if(!response.ok){
  console.error(`[agent] NVIDIA API ${response.status}: ${(result?.error?.message??'').slice(0,500)}`)
  throw new AgentError(errorMessage(response.status,config.model))
 }
 const text=result?.choices?.[0]?.message?.content?.trim()??''
 if(!text)throw new AgentError('NVIDIA returned an empty answer. Please try again.')
 emit({type:'text',text})
}
function sendJson(res:ServerResponse,status:number,error:string){res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({error}))}
async function readBody(req:IncomingMessage){
 let body='';for await(const chunk of req){body+=chunk;if(body.length>MAX_BODY_BYTES)return null}return body
}
function parseHistory(body:string):ChatTurn[]|null{
 let parsed:unknown;try{parsed=JSON.parse(body)}catch{return null}
 const turns=(parsed as {messages?:unknown})?.messages
 if(!Array.isArray(turns)||!turns.length)return null
 const valid=turns.every(t=>(t?.role==='user'||t?.role==='assistant')&&typeof t?.content==='string'&&t.content.trim()&&t.content.length<=MAX_MESSAGE_CHARS)
 if(!valid||turns.at(-1).role!=='user')return null
 return turns.slice(-MAX_HISTORY).map(({role,content})=>({role,content}))
}
function createHandler(env:Record<string,string>):Connect.NextHandleFunction{
 return async(req,res,next)=>{
  if(req.url?.split('?')[0]!=='/api/agent')return next()
  if(req.method!=='POST')return sendJson(res,405,'Use POST.')
  if(!req.headers['content-type']?.startsWith('application/json'))return sendJson(res,415,'Send JSON.')
  const body=await readBody(req);if(body===null)return sendJson(res,413,'That message is too long.')
  const history=parseHistory(body);if(!history)return sendJson(res,400,'That message could not be sent. Please shorten it and try again.')
  const apiKey=env.NVIDIA_API_KEY?.trim();if(!apiKey)return sendJson(res,503,'Add NVIDIA_API_KEY to .env.local.')
  const controller=new AbortController();res.on('close',()=>controller.abort())
  res.setHeader('Content-Type','application/x-ndjson; charset=utf-8');res.setHeader('Cache-Control','no-cache');res.setHeader('X-Accel-Buffering','no')
  const emit=(event:AgentEvent)=>res.write(`${JSON.stringify(event)}\n`)
  try{await runAgent(history,{apiKey,baseUrl:(env.NVIDIA_BASE_URL?.trim()||DEFAULT_BASE_URL).replace(/\/$/,''),model:env.NVIDIA_MODEL?.trim()||DEFAULT_MODEL},emit,controller.signal)}
  catch(error){if(!controller.signal.aborted){if(!(error instanceof AgentError))console.error('[agent]',error);emit({type:'error',text:error instanceof AgentError?error.message:'Could not reach the NVIDIA API. Please try again.'})}}
  res.end()
 }
}
export function agentApi(env:Record<string,string>):Plugin{
 const handler=createHandler(env)
 return{name:'ikasle-agent-api',configureServer:s=>void s.middlewares.use(handler),configurePreviewServer:s=>void s.middlewares.use(handler)}
}
