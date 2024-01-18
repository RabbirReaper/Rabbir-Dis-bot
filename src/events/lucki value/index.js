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

    let modifiedContent = message.content.replace(/<@!?(\d+)>/g, '').trim();

    const x = randomInt(djson.draw.length)
    await message.reply(modifiedContent+" "+djson.draw[x])
}
