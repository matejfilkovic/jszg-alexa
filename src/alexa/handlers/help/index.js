// @flow
const HELP_MESSAGE = 'Here are some of the things you can ask me.'

const HELP_REPROMPT_MESSAGE = 'What can I help you with?'

const SAMPLE_UTTERANCES = [
  'Tell me my orders',
  'Order a meal',
  'Tell me which meals I can order for tomorrow'
]

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    const utterancesJoined = SAMPLE_UTTERANCES.join('. ')
    const speechText = `${HELP_MESSAGE} ${utterancesJoined}. What can I do for you?`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(HELP_REPROMPT_MESSAGE)
      .getResponse()
  }
}

module.exports = HelpIntentHandler
