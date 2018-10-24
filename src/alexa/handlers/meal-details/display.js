const Alexa = require('ask-sdk')

function getPrimaryText(meal) {
  const primaryText = (
    `<font size='3'>
      <br />
      <br />
      <br />
    </font>
    <font size='7'>
      ${meal.name}
    </font>
    <font size='3'>
      <br />
      <b>Calories: ${meal.calories} kcal</b>
      <br />
    </font>
    <font size='2'>
      Fat: ${meal.fat}g
      <br />
      Carbs: ${meal.carbs}g
      <br />
      Protein: ${meal.protein}g
      <br />
      Sugar: ${meal.sugars}g
    </font>
    `
  )

  return primaryText
}

module.exports.buildTemplate = (meal) => {
  const textContent = (
    new Alexa.RichTextContentHelper()
      .withPrimaryText(getPrimaryText(meal))
      .getTextContent()
  )

  const image = (
    new Alexa.ImageHelper()
      .addImageInstance(meal.imageUrl)
      .getImage()
  )

  return {
    image,
    textContent,
    type: 'BodyTemplate2',
    token: 'string',
    title: 'Meal details'
  }
}
