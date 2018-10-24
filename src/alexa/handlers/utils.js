const moment = require('moment')

module.exports.getDateSpeechText = (date) => {
  const now = moment().startOf('day')
  const dateMoment = moment(date).startOf('day')

  const daysDiff = dateMoment.diff(now, 'days')
  if (daysDiff === 0) {
    return 'today'
  }
  else if (daysDiff === 1) {
    return 'tomorrow'
  }
  else if (daysDiff <= 7) {
    return `${dateMoment.format('dddd')}`
  }

  return `${dateMoment.format('MMMM Do')}`
}

module.exports.getSlotValue = (request, slotName) => {
  return request.intent.slots[slotName].value
}

module.exports.supportsDisplay = (handlerInput) => {
  const displaySupported = (
    handlerInput.requestEnvelope.context
    && handlerInput.requestEnvelope.context.System
    && handlerInput.requestEnvelope.context.System.device
    && handlerInput.requestEnvelope.context.System.device.supportedInterfaces
    && handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
  )

  return displaySupported
}
