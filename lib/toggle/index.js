/**
 * Class representing a Toggle.
 * @extends {Setting}
 */
class Toggle extends require('../setting') {
  /**
   * Set the value of the Toggle to true.
   * @param  {DataClient} bot The bot object.
   * @return {String}         Confirmation message.
   */
  enable (bot) {
    return this.setValue(true, bot)
  }
  /**
   * Set the value of the Toggle to false.
   * @param  {DataClient} bot The bot object.
   * @return {String}         Confirmation message.
   */
  disable (bot) {
    return this.setValue(false, bot)
  }
}

module.exports = Toggle
