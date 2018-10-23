const { DEFAULT_REPOROMPT_MESSAGE } = require('../constants')

const HELLO_MESSAGE = 'Welcome to Lunch skill. What can I do for you?'

const LaunchRequestIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELLO_MESSAGE)
      .reprompt(DEFAULT_REPOROMPT_MESSAGE)
      .getResponse()
  }
}

module.exports = LaunchRequestIntent
