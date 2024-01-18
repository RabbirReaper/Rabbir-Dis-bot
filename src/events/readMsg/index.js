import {Events} from 'discord.js'
import fs from 'fs'
import djson from '@/store/msg.json'
import path from 'path'

export const event = {
    name:Events.MessageCreate,
    once:false,
}
export const action = async(message) =>{//```key``````val```
    if (message.author.bot) return;
    // console.log(message.content)

    message.content = message.content.replace(/<@!?(\d+)>/g, '').trim();//把一開始的tag 清除掉
    const check  = './r'
    message.content = message.content.trim()
    if(message.content.substring(0,3) !== check) return
    djson['ans_key'].push(message.content.substring(3));

    fs.writeFileSync("src\\store\\msg.json", JSON.stringify(djson));
    await message.reply("OK")
}
