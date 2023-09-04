const { SlashCommandBuilder } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder().setName("time").setDescription("Shows what time it is"),
    async execute(interaction) {
        let time = new Date()
        let minutes

        if (time.getMinutes().toString().length === 0) {
            minutes = `0${time.getMinutes()}`
        }
        else {
            minutes = time.getMinutes()
        }
        await interaction.reply(`The time now is ${time.getHours()}:${minutes}`)
    }
}