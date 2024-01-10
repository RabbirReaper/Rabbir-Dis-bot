import { SlashCommandBuilder } from "discord.js";
import fil from '@/store/msg.json'

export const command = new SlashCommandBuilder()
    .setName('find')
    .setDescription('find files')
    .addStringOption(option => 
        option
        .setName('name')
        .setDescription('Enter a information title')
        .setRequired(true)
        .setAutocomplete(true)
    )
    

export const action = async(interaction) =>{
    const key = interaction.options.getString('name')
    console.log(key)
    let i
    for (i = 0; i < fil.ans_key.length; i++) {
        if(key === fil.ans_key[i]) break
    }
    if(i === fil.ans_key.length) await interaction.reply("查無此資料")
    else await interaction.reply(fil.ans_value[i])
}


