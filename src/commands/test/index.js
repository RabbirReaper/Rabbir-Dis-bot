import { SlashCommandBuilder } from "discord.js";



export const command = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test bot')

export const action = async(interaction) =>{
    await interaction.reply('Pong!');
    await interaction.followUp('Pong again!');
}