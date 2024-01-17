import {Events} from 'discord.js'
import fs from 'fs'
import djson from '@/store/msg.json'
import { randomInt } from 'crypto'


export const event = {
    name:Events.MessageCreate,
    once:false,
}
export const action = async(message) =>{
    if (message.author.bot) return;
    
    if(message.content.substring(message.content.length - 2) !== '運勢') return

    message.content = message.content.replace("<@1007521034515271742>","")//把一開始的tag 清除掉
    
    message.content = message.content.trim()
    const x = randomInt(djson.draw.length)
    await message.reply(message.content+" "+djson.draw[x])
}
