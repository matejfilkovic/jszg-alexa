const { fetchOrders } = require('../../../lunch-api')
const { getDateSpeechText } = require('../utils')

const { WHAT_ELSE_HELP_MESSAGE } = require('../constants')

const GetOrdersIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetOrdersIntent'
  },
  async handle(handlerInput) {
    const ordersSpeechText = await getOrdersSpeechText()

    const speechText = `${ordersSpeechText} ${WHAT_ELSE_HELP_MESSAGE}`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}

async function getOrdersSpeechText() {
  const orders = await fetchOrders()

  if (!orders.length) {
    return "You haven't ordered ordered anything for currently available dates!"
  }

  const ordersSpeechText = orders.map((order) => {
    const dateSpeechText = getDateSpeechText(order.date)

    return `For ${dateSpeechText} you have ordered ${order.mealName}.`
  })

  return ordersSpeechText.join(' ')
}

module.exports = GetOrdersIntentHandler
