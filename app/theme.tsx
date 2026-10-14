'use client';
export default function Theme({event}:{event:any}){const keys={themeAccent:'--theme-accent',themeBackground:'--theme-background',themeSurface:'--theme-surface',themeText:'--theme-text'};const values=Object.entries(keys).flatMap(([key,css])=>/^#[0-9a-fA-F]{6}$/.test(event?.[key]||'')?[css+':'+event[key]]:[]);return values.length?<style>{':root{'+values.join(';')+'}'}</style>:null}
