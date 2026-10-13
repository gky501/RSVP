import {event,json} from '../../event';
export async function GET(){return json(await event());}
