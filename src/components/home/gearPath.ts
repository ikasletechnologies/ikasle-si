export function gearPath(cx: number, cy: number, outer: number, root: number, hole: number, teeth: number, phaseDegrees = 0) {
  const step = (Math.PI * 2) / teeth
  const phase = (phaseDegrees * Math.PI) / 180
  const at = (radius: number, angle: number) =>
    `${(cx + radius * Math.cos(angle)).toFixed(2)} ${(cy + radius * Math.sin(angle)).toFixed(2)}`
  let d = ''
  for (let k = 0; k < teeth; k++) {
    const a = k * step + phase
    d += `${k ? 'L' : 'M'}${at(root, a - step * 0.32)} L${at(outer, a - step * 0.15)} L${at(outer, a + step * 0.15)} L${at(root, a + step * 0.32)} `
  }
  return `${d}Z M${cx + hole} ${cy} A${hole} ${hole} 0 1 0 ${cx - hole} ${cy} A${hole} ${hole} 0 1 0 ${cx + hole} ${cy} Z`
}
