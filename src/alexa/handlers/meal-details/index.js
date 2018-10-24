const { buildTemplate } = require('./display')
const { fetchAvailableMeals } = require('../../../lunch-api')

const { WHAT_ELSE_HELP_MESSAGE } = require('../constants')

const MealDetailsIntentHandler = {
  canHandle(handlerInput) {
    try {
      const [type] = handlerInput.requestEnvelope.request.token.split('_')

      return type === 'meal'
    }
    catch (_) {
      return false
    }
  },
  async handle(handlerInput) {
    const selectedMealIndx = parseInt(handlerInput.requestEnvelope.request.token.split('_')[1], 10)

    const meals = await fetchAvailableMeals()

    const template = buildTemplate(meals[selectedMealIndx])

    const speechText = getMealDetailsSpeechText(meals[selectedMealIndx])

    return handlerInput.responseBuilder
      .addRenderTemplateDirective(template)
      .speak(speechText)
      .reprompt(WHAT_ELSE_HELP_MESSAGE)
      .getResponse()
  }
}

function getMealDetailsSpeechText(meal) {
  return (
    `Here are the details for ${meal.name}.
     ${meal.calories} calories.
     Fat: ${meal.fat} grams.
     Carbs: ${meal.carbs} grams.
     Proteins: ${meal.protein} grams.
     Sugars: ${meal.sugars} grams.
    `
  )
}

module.exports = MealDetailsIntentHandler
