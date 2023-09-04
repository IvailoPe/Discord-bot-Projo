const { joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('j')
		.setDescription('join in voice channel'),
	async execute(interaction) {
		const channel = interaction.channel
		let connection = joinVoiceChannel(
			{
				channelId: interaction.member.voice.channelId,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
				selfDeaf: false,
				selfMute: false,
			}
		)
		await interaction.reply(`Joining channel...`)

	},
};