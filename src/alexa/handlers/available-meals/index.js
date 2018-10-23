const { fetchAvailableMeals } = require('../../../lunch-api')
const {
  getSlotValue,
  getDateSpeechText
} = require('../utils')
const { WHAT_ELSE_HELP_MESSAGE } = require('../constants')

const GetAvailableMealsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetAvailableMealsIntent'
  },
  async handle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    if (request.dialogState !== 'COMPLETED') {
      return handlerInput.responseBuilder
        .addDelegateDirective()
        .getResponse()
    }

    const date = getSlotValue(request, 'Date')
    const mealsSpeechText = await getAvailableMealsSpeechText(date)

    const speechText = `${mealsSpeechText} ${WHAT_ELSE_HELP_MESSAGE}`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}

async function getAvailableMealsSpeechText(date) {
  const meals = await fetchAvailableMeals()

  const mealsSpeechText = meals.map(meal => (
    meal.name
  )).join(', ')

  const dateSpeechText = getDateSpeechText(date)

  return `Here are the meals you can order ${dateSpeechText}: ${mealsSpeechText}.`
}

module.exports = GetAvailableMealsIntentHandler
