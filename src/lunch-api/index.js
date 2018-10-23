const orders = require('./resources/orders')

module.exports.fetchOrders = () => {
  return Promise.resolve(orders)
}
