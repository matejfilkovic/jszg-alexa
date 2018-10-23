const { DEFAULT_REPOROMPT_MESSAGE } = require('../constants')

const ErrorHandler = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`)

    return handlerInput.responseBuilder
      .speak(DEFAULT_REPOROMPT_MESSAGE)
      .reprompt(DEFAULT_REPOROMPT_MESSAGE)
      .getResponse()
  },
}

module.exports = ErrorHandler
