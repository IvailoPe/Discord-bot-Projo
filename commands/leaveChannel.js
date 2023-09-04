const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const {eventEmitter} = require("./playMusicInChannel")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('l')
		.setDescription('leave from voice channel'),
	async execute(interaction) {
		const connection = getVoiceConnection(interaction.guild.id);
		connection.destroy()
		eventEmitter.emit("leave")
		await interaction.reply("Leaving...");
	},
};