const { DEFAULT_REPOROMPT_MESSAGE } = require('../constants')

const ErrorHandler = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`)

    const speechText = `Sorry, we got in a trouble. ${DEFAULT_REPOROMPT_MESSAGE}`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPOROMPT_MESSAGE)
      .getResponse()
  },
}

module.exports = ErrorHandler
