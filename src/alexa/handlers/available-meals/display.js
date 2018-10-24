const Alexa = require('ask-sdk')

module.exports.buildTemplate = (meals) => {
  const mealListItems = meals.map((meal, index) => {
    const image = (
      new Alexa.ImageHelper()
        .addImageInstance(meal.imageUrl)
        .getImage()
    )

    const textContent = (
      new Alexa.PlainTextContentHelper()
        .withPrimaryText(meal.name.substring(0, 15))
        .withSecondaryText(`${meal.calories} kcal`)
        .getTextContent()
    )

    return {
      image,
      textContent,
      token: `meal_${index}`
    }
  })

  return {
    type: 'ListTemplate2',
    token: 'string',
    backButton: 'HIDDEN',
    title: 'Meals available for order',
    listItems: mealListItems,
  }
}
