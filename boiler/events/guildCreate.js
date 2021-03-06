const { Event } = require('../../lib')

module.exports = new Event({
  name: 'guildCreate',
  run: (bot, guild) => {
    bot.logger.success(`joined ${guild.name} guild`)
    bot.dbm.addClient(guild.id, bot.defaultSettings.prefix)
  }
})
