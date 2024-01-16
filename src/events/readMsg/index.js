import {Events} from 'discord.js'
import fs from 'fs'
import djson from '@/store/msg.json'
import path from 'path'

export const event = {
    name:Events.MessageCreate,
    once:false,
}
export const action = async(message) =>{
    if (message.author.bot) return;
    message.content = message.content.replace("<@1007521034515271742>","")//把一開始的tag 清除掉
    const check  = './r'

    message.content = message.content.trim()
    if(message.content.substring(0,3) !== check) return
    djson['key'] = 'new value';

    fs.writeFileSync(filePath, JSON.stringify(djson));
    await message.reply("OK")
}
