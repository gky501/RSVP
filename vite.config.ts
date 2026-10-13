import vinext from 'vinext';
import {defineConfig} from 'vite';

export default defineConfig(async()=>{process.env.WRANGLER_WRITE_LOGS??='false';process.env.WRANGLER_LOG_PATH??='.wrangler/logs';process.env.CLOUDFLARE_CF_FETCH_ENABLED??='false';process.env.WRANGLER_SEND_METRICS??='false';const {cloudflare}=await import('@cloudflare/vite-plugin');return {plugins:[vinext(),cloudflare({viteEnvironment:{name:'rsc',childEnvironments:['ssr']},inspectorPort:false})],server:{host:'127.0.0.1',watch:{useFsEvents:false,usePolling:true}}};});
