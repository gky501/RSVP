import {env} from 'cloudflare:workers';
import {json} from './event';
export type Organizer={id:string;username:string;name:string;role:string};
const encoder=new TextEncoder();const hex=(v:ArrayBuffer)=>Array.from(new Uint8Array(v),b=>b.toString(16).padStart(2,'0')).join('');
export async function sha(value:string){return hex(await crypto.subtle.digest('SHA-256',encoder.encode(value)))}
export async function hashPassword(password:string,salt:string){const key=await crypto.subtle.importKey('raw',encoder.encode(password),{name:'PBKDF2'},false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:encoder.encode(salt),iterations:100000,hash:'SHA-256'},key,256))}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin}
export function sessionCookie(token:string,req:Request,maxAge=43200){return 'rsvp_session='+token+'; HttpOnly; Path=/; SameSite=Strict; Max-Age='+maxAge+(new URL(req.url).protocol==='https:'?'; Secure':'')}
export async function currentUser(req:Request):Promise<Organizer|null>{const token=req.headers.get('cookie')?.match(/(?:^|;\s*)rsvp_session=([^;]+)/)?.[1];if(!token||token.length>100)return null;return env.DB!.prepare('SELECT o.id,o.username,o.name,o.role FROM sessions s JOIN organizers o ON o.id=s.organizer_id WHERE s.hash=? AND s.expires>?').bind(await sha(token),Date.now()).first<Organizer>()}
export async function createSession(user:Organizer,req:Request){const token=crypto.randomUUID()+crypto.randomUUID();await env.DB!.prepare('INSERT INTO sessions(hash,organizer_id,expires) VALUES(?,?,?)').bind(await sha(token),user.id,Date.now()+43200000).run();return Response.json({user},{headers:{'Set-Cookie':sessionCookie(token,req),'Cache-Control':'no-store'}})}
export async function setupAvailable(){return !(await env.DB!.prepare('SELECT id FROM organizers LIMIT 1').first())}
export async function throttled(req:Request,username:string){const bucket='login:'+req.headers.get('cf-connecting-ip')+':'+username+':'+Math.floor(Date.now()/900000);const r=await env.DB!.prepare('INSERT INTO lookup_limits(id,count) VALUES(?,1) ON CONFLICT(id) DO UPDATE SET count=count+1 RETURNING count').bind(bucket).first<{count:number}>();return !!r&&r.count>12}
export function validAccount(b:any){return typeof b.username==='string'&&/^[a-zA-Z0-9._-]{3,40}$/.test(b.username)&&typeof b.name==='string'&&b.name.trim().length>0&&b.name.length<=100&&typeof b.password==='string'&&b.password.length>=8&&b.password.length<=128}
export {json};
