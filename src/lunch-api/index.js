const orders = require('./resources/orders')
const meals = require('./resources/meals')

module.exports.fetchOrders = () => {
  return Promise.resolve(orders)
}

module.exports.fetchAvailableMeals = () => {
  return Promise.resolve(meals)
}
