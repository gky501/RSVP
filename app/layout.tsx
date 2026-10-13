import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Christmas Party · RSVP',description:'Your employee Christmas party invitation.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
