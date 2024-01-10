import { SlashCommandBuilder } from "discord.js";
import fil from '@/store/msg.json'



export const command = new SlashCommandBuilder()
    .setName('list')
    .setDescription('list data')

export const action = async(interaction) =>{
    await interaction.reply("```\n" + fil.ans_key.toString() +"```")
    // await interaction.followUp('Pong again!');
}