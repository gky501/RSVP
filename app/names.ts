export function outwardName(name:string){const parts=name.trim().split(',');return parts.length===2&&parts.every(p=>p.trim())?parts[1].trim()+' '+parts[0].trim():name.trim()}
