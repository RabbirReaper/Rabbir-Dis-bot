import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping connand')
    .addStringOption(option => // 添加一個字符串選項
        option
        .setName('code')
        .setDescription('Enter a code')
        .setRequired(true))
    

export const action = async(interaction) =>{
    const code = interaction.options.getString('code');

    await interaction.reply(`\`\`\`${code}\`\`\``); 
}