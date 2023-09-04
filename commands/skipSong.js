const { SlashCommandBuilder } = require('discord.js');
const {eventEmitter} = require("./playMusicInChannel")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('s')
		.setDescription('skip song'),
	async execute(interaction) {
		eventEmitter.emit("skip")
		await interaction.reply("Skiping current song/Trying to skip current song");
	},
};