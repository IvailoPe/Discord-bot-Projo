const { Events } = require('discord.js');
const fs = require('node:fs');
const { join } = require('node:path');

module.exports = {
    name: Events.ClientReady,
	once: true,
	execute(client) {
		let pahtForMusic = 'C:\\Users\\ivo\\Desktop\\JS projects\\Discord bot projo\\music'
		let musics = fs.readdirSync(pahtForMusic)
		let numberOfMusics = musics.length
		if(numberOfMusics === 0){
			console.log("No music to delete, folder is empty")
		}
		else{
			for (let index = 0; index < numberOfMusics; index++) {
		        fs.unlinkSync(join(pahtForMusic, musics[index]),() => {
					console.log(`${index + 1} music/s was/er deleted`)
				})
			}
		}
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
}