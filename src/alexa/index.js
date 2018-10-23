const Alexa = require('ask-sdk')

const HelpIntentHandler = require('./handlers/help')
const LaunchRequestIntent = require('./handlers/launch')
const StopIntentHandler = require('./handlers/stop')
const ErrorHandler = require('./handlers/error')
const GetOrdersIntentHandler = require('./handlers/get-orders')

exports.handler = (
  Alexa.SkillBuilders.custom()
    .addRequestHandlers(
      GetOrdersIntentHandler,
      HelpIntentHandler,
      LaunchRequestIntent,
      HelpIntentHandler,
      StopIntentHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda()
)
