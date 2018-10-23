const Alexa = require('ask-sdk')

const HelpIntentHandler = require('./handlers/help')
const LaunchRequestIntent = require('./handlers/launch')
const StopIntentHandler = require('./handlers/stop')
const ErrorHandler = require('./handlers/error')

let skill

exports.handler = async (event, context) => {
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        HelpIntentHandler,
        LaunchRequestIntent,
        StopIntentHandler
      )
      .addErrorHandlers(ErrorHandler)
      .create()
  }

  const response = await skill.invoke(event, context)

  return response
}
