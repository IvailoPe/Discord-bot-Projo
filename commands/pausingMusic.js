const { SlashCommandBuilder } = require('discord.js');
const {eventEmitter} = require("./playMusicInChannel")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pa')
		.setDescription('Pause song'),
	async execute(interaction) {
		eventEmitter.emit("pause")
		await interaction.reply(`Pausing song...`);
	},
};