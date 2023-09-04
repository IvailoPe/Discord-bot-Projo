const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios")

let champions = []
let championsAndTags = {}

function getInfoAbouChampions(interaction) {
	const inputFromUser = interaction.options.getString('input');
	console.log(inputFromUser);
	let data
	axios.get("https://ddragon.leagueoflegends.com/cdn/13.17.1/data/en_US/champion.json")
		.then(async (obj) => {
			data = obj.data.data;
			if (!inputFromUser) {
				if (champions.length === 0) {
					for (const key in data) {
						champions.push(key)
					}
				}
				let champ = champions[Math.floor(champions.length * Math.random())]
				console.log(interaction);
				await interaction.followUp(`${interaction.user} your champion is ${champ}`)
			}
			else if (inputFromUser) {
				if (Object.keys(championsAndTags).length === 0) {
					for (const key in data) {
						if (!championsAndTags.hasOwnProperty(data[key].tags[0])) {
							championsAndTags[data[key].tags[0]] = {}
						}
						console.log(`${key} --- ${data[key].tags}`);
						console.log(data[key].tags);
					}
					console.log(championsAndTags);
					for (const key in data) {
						if (data[key].tags.length === 1) {
							if (!championsAndTags[data[key].tags[0]].hasOwnProperty(data[key].tags[0])) {
								championsAndTags[data[key].tags[0]][data[key].tags[0]] = []
							}
						}
						else if (data[key].tags.length === 2) {
							if (!championsAndTags[data[key].tags[0]].hasOwnProperty(data[key].tags[1])) {
								championsAndTags[data[key].tags[0]][data[key].tags[1]] = []
							}
						}
					}

					for (const key in data) {
						if (data[key].tags.length === 1) {
							if (championsAndTags.hasOwnProperty(data[key].tags[0])) {
								if (championsAndTags[data[key].tags[0]].hasOwnProperty(data[key].tags[0])) {
									championsAndTags[data[key].tags[0]][data[key].tags[0]].push(key)
								}
							}
						}
						else if (data[key].tags.length === 2) {
							if (championsAndTags.hasOwnProperty(data[key].tags[0])) {
								if (championsAndTags[data[key].tags[0]].hasOwnProperty(data[key].tags[1])) {
									championsAndTags[data[key].tags[0]][data[key].tags[1]].push(key)
								}
							}
						}

					}
					console.log(championsAndTags);
				}
				let arrOfWords = inputFromUser.split(" ")
				if (arrOfWords[1] === "/show" || arrOfWords[2] === "/show") {
					arrOfWords.pop()
					if (arrOfWords.length === 1) {
						let stat = arrOfWords[0]
						if (championsAndTags.hasOwnProperty(stat)) {
							if (championsAndTags[stat].hasOwnProperty(stat)) {
								let stringWithChampions = championsAndTags[stat][stat].join(", ")
								await interaction.followUp(`${interaction.user} champions: ${stringWithChampions}`)
							}
						}
					}
					else if (arrOfWords.length === 2) {
						let firstStat = arrOfWords[0]
						let secondStat = arrOfWords[1]
						if (championsAndTags.hasOwnProperty(firstStat)) {
							if (championsAndTags[firstStat].hasOwnProperty(secondStat)) {
								let stringWithChampions = championsAndTags[firstStat][secondStat].join(", ")
								await interaction.followUp(`${interaction.user} champions: ${stringWithChampions}`)
							}
						}

					}
				}
				else if (arrOfWords.length === 1) {
					let stat = arrOfWords[0]
					if (championsAndTags.hasOwnProperty(stat)) {
						if (championsAndTags[stat].hasOwnProperty(stat)) {
							let randomIndex = Math.floor(championsAndTags[stat][stat].length * Math.random())
							let champ = championsAndTags[stat][stat][randomIndex]
							await interaction.followUp(`${interaction.user} based on your options your champions is ${champ}`)
						}
					}
				}
				else if (arrOfWords.length === 2) {
					let firstStat = arrOfWords[0]
					let secondStat = arrOfWords[1]
					if (championsAndTags.hasOwnProperty(firstStat)) {
						if (championsAndTags[firstStat].hasOwnProperty(secondStat)) {
							let randomIndex = Math.floor(championsAndTags[firstStat][secondStat].length * Math.random())
							let champ = championsAndTags[firstStat][secondStat][randomIndex]
							await interaction.followUp(`${interaction.user} based on your options your champions is ${champ}`)
						}
					}
				}
			}
		})
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('destiny')
		.setDescription('Chooses random LoL champion')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('fff')),
	async execute(interaction) {
		await interaction.reply("Let me choose your destiny");
		getInfoAbouChampions(interaction)
	}
}