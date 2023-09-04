const { SlashCommandBuilder } = require('discord.js');
const {eventEmitter} = require("./playMusicInChannel")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('r')
		.setDescription('Resume song'),
	async execute(interaction) {
		eventEmitter.emit("resume")
		await interaction.reply(`Resuming song...`);
	},
};