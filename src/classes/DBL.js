/**
 * The DBL Client.
 * @external DBL
 * @see {@link https://discordbots.org/api/docs#jslib|DBL}
 */

/**
 * Class representing a DBL manager.
 * @extends {DBL}
 */

class DBL extends require('dblapi.js') {
  /**
   * Create a DBL manager.
   * @param    {Object}     data           The data to pass to the DBL API.
   * @property {String}     data.token     Your bot's discordbots.org token.
   * @property {Object}     [data.options] DBL client options.
   * @property {DataClient} data.client    Your bot client.
   */
  constructor ({ token, options, client }) {
    super(token, options, client)
    this.on('posted', () => client.emit('dblPosted'))
    this.on('error', (error) => client.emit('error', error))
    if (this.webhook) {
      this.webhook.on('ready', (hook) => client.emit('dblWebhookReady', hook))
      this.webhook.on('vote', (vote) => client.emit('dblWebhookVote', vote))
    }
  }
}

module.exports = DBL
