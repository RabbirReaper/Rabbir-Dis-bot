import { SlashCommandBuilder } from "discord.js";



export const command = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show help for the bot')

export const action = async(interaction) =>{
    await interaction.reply('Pong!');
    await interaction.followUp('Pong again!');
}