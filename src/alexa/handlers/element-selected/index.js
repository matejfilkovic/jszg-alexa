const MealDetailsIntentHandler = require('../meal-details')

const ElementSelectedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Display.ElementSelected'
  },
  handle(handlerInput) {
    if (MealDetailsIntentHandler.canHandle(handlerInput)) {
      return MealDetailsIntentHandler.handle(handlerInput)
    }
  }
}

module.exports = ElementSelectedIntentHandler
