module.exports = async (bot) => {
  bot.ownerID = (await bot.getOAuthApplication()).owner.id
  await bot.dbm.initialize(bot.guilds)
  bot.logger.success('online')
  if (bot.toggles.get('rotateStatus').value) bot.status.startRotate(bot)
  bot.status.default(bot)
}
