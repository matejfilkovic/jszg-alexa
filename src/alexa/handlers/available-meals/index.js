const { fetchAvailableMeals } = require('../../../lunch-api')

const { WHAT_ELSE_HELP_MESSAGE } = require('../constants')

const GetAvailableMealsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetAvailableMealsIntent'
  },
  async handle(handlerInput) {
    const mealsSpeechText = await getAvailableMealsSpeechText()

    const speechText = `${mealsSpeechText} ${WHAT_ELSE_HELP_MESSAGE}`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}

async function getAvailableMealsSpeechText() {
  const meals = await fetchAvailableMeals()

  const mealsSpeechText = meals.map(meal => (
    meal.name
  )).join(', ')

  return `Here are the meals you can order: ${mealsSpeechText}.`
}

module.exports = GetAvailableMealsIntentHandler
