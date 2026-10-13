import {env} from 'cloudflare:workers';
export const defaults={title:'[Placeholder Name] Christmas Party',date:'2026-12-11',time:'17:30',dinner:'Time to be announced',venue:'De Cantilon in NLR',deadline:'',closed:false};
export async function event(){const row=await env.DB!.prepare('SELECT value FROM settings WHERE id = ?').bind('event').first<{value:string}>();return row?{...defaults,...JSON.parse(row.value)}:defaults;}
export function accepting(e:typeof defaults){return !e.closed && (!e.deadline || Date.now()<=Date.parse(e.deadline+'T23:59:59-06:00'));}
export function admin(request:Request){const key=(env as unknown as {ADMIN_KEY?:string}).ADMIN_KEY;return !!key && request.headers.get('authorization')==='Bearer '+key;}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}
