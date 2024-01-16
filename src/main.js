import { Client, Events, GatewayIntentBits,Partials } from 'discord.js'
import dotenv from 'dotenv'
import vueInit from '@/core/vue'
import {loadCommands,loadEvents} from '@/core/loader'
import {useAppStore} from '@/store/app'
dotenv.config()
vueInit()
loadCommands()
// const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.DirectMessages],'partials': [Partials.Channel] })
const client = new Client({
    'intents': [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
    ],
    'partials': [Partials.Channel]
  });

const appStore = useAppStore()
appStore.client = client
loadEvents()



client.login(process.env.Token);