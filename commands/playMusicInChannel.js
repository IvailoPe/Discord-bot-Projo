const { getVoiceConnection, createAudioResource, createAudioPlayer, AudioPlayerStatus, StreamType } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const play_dl = require('play-dl');

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

let Interaction

let player = new createAudioPlayer()

let queueOfSongs = []

let resource

eventEmitter.on("pause", () => {
    if (player.state.status === "playing") {
        player.pause()
    }
})

eventEmitter.on("resume", () => {
    if (player.state.status === "paused") {
        player.unpause()
    }
})

eventEmitter.on("skip", async () => {
    if (player.state.status === "playing" && queueOfSongs.length >= 1) {
        let song = queueOfSongs.shift()
        let stream = await play_dl.stream(song[Object.keys(song)[0]], { quality: 0 })
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        player.play(resource)
        await Interaction.followUp(`Playing next sont: ${Object.keys(song)[0]}`)
    }
})

eventEmitter.on("leave", () => {
    queueOfSongs.length = 0
})

player.on(AudioPlayerStatus.AutoPaused, () => {
    console.log('The audio has been autopaused');
});

player.on(AudioPlayerStatus.Buffering, () => {
    console.log('Buffering...');
});

player.on(AudioPlayerStatus.Playing, () => {
    console.log('The audio player has started playing!');
});

player.on(AudioPlayerStatus.Paused, () => {
    console.log("Song is paused");
})

player.on(AudioPlayerStatus.Idle, async () => {
    if (queueOfSongs.length > 0) {
        let song = queueOfSongs.shift()
        let stream = await play_dl.stream(song[Object.keys(song)[0]], { quality: 0 })
        resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        player.play(resource)
        await Interaction.followUp(`Playing next song: ${Object.keys(song)[0]}`)
    }
    else {
        await Interaction.followUp("No more songs to play")
    }
})


module.exports = {
    data: new SlashCommandBuilder()
        .setName('p')
        .setDescription('play music or add music to queue')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')),
    async execute(interaction) {
        const userInput = interaction.options.getString('input');
        const connection = getVoiceConnection(interaction.guild.id);

        if (userInput.split(":")[0] !== "https" || userInput.split === null) {
            await interaction.reply("Wrong link")
            return
        }

        let videoDetails = await play_dl.video_basic_info(userInput)

        if (player.state.status === "playing") {
            Interaction = interaction
            queueOfSongs.push({ [videoDetails.video_details.title]: userInput })
            await interaction.reply(`Added music to queue`)
        }
        else {
            let stream = await play_dl.stream(userInput, { quality: 0 })
            resource = createAudioResource(stream.stream, {
                inputType: stream.type
            })
            player.play(resource)
            connection.subscribe(player)
            await interaction.reply(`Playing: ${videoDetails.video_details.title}`)
        }
    },
    eventEmitter
};