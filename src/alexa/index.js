const Alexa = require('ask-sdk')

const HelpIntentHandler = require('./handlers/help')
const LaunchRequestIntent = require('./handlers/launch')
const StopIntentHandler = require('./handlers/stop')
const ErrorHandler = require('./handlers/error')
const GetOrdersIntentHandler = require('./handlers/get-orders')
const GetAvailableMealsIntentHandler = require('./handlers/available-meals')

exports.handler = (
  Alexa.SkillBuilders.custom()
    .addRequestHandlers(
      GetOrdersIntentHandler,
      GetAvailableMealsIntentHandler,
      HelpIntentHandler,
      LaunchRequestIntent,
      HelpIntentHandler,
      StopIntentHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda()
)
