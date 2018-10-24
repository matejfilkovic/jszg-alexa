const { fetchAvailableMeals } = require('../../../lunch-api')
const {
  getSlotValue,
  getDateSpeechText,
  supportsDisplay
} = require('../utils')

const { WHAT_ELSE_HELP_MESSAGE } = require('../constants')

const { buildTemplate } = require('./display')

const GetAvailableMealsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetAvailableMealsIntent'
  },
  async handle(handlerInput) {
    const { request } = handlerInput.requestEnvelope
    const date = getSlotValue(request, 'Date')

    // An example with ElicitSlot directive.
    if (request.dialogState !== 'COMPLETED') {
      if (!date) {
        return handlerInput.responseBuilder
          .addElicitSlotDirective('Date')
          .speak('When')
          .reprompt('When')
          .getResponse()
      }
    }

    /* An original example with Delegate directive.
    if (request.dialogState !== 'COMPLETED') {
      return handlerInput.responseBuilder
        .addDelegateDirective()
        .getResponse()
    }
    */

    const meals = await fetchAvailableMeals()

    if (supportsDisplay(handlerInput)) {
      const template = buildTemplate(meals)

      handlerInput.responseBuilder
        .addRenderTemplateDirective(template)
    }

    const mealsSpeechText = await getAvailableMealsSpeechText(date, meals)
    const speechText = `${mealsSpeechText} ${WHAT_ELSE_HELP_MESSAGE}`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(WHAT_ELSE_HELP_MESSAGE)
      .addHintDirective('Select the first one')
      .getResponse()
  }
}

async function getAvailableMealsSpeechText(date, meals) {
  const mealsSpeechText = meals.map(meal => (
    meal.name
  )).join(', ')

  const dateSpeechText = getDateSpeechText(date)

  return `Here are the meals you can order ${dateSpeechText}: ${mealsSpeechText}.`
}

module.exports = GetAvailableMealsIntentHandler
