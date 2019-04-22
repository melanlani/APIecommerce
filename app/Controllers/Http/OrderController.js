'use strict'
const Order = use('App/Models/Order')
const Database = use("Database");

class OrderController {

  async index ({ request, response, view }) {

    try {
      const orders = await Database
                          .table('orders')
                          .select('orders.id as orderId', 'products.*', 'orders.*',)
                          .innerJoin('products', 'orders.product_id', 'products.id')
      return response.status(200).send({data: orders})
    }
		catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
		}

  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {

    try {
      const {price, qty, product_id} = request.post();
      const order = new Order();
      order.price = price;
      order.qty = qty;
      order.product_id = product_id;
      await order.save();

      return response.status(200).send({data: order})
    }
    catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async show ({ params, request, response, view }) {

    try {
      const { id } = params
      const orders = await Database
                                .table('orders')
                                .select('orders.id as orderId', 'products.*', 'orders.*',)
                                .innerJoin('products', 'orders.product_id', 'products.id')
                                .where('orders.id',id)
      if({data: orders == null})
        return response.status(404).send({'message':'Data not found!'})

      return response.status(200).send({data: orders})
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async update ({params, request, response, auth }) {

    try {
      const { id } = params
      const {qty, price} = await request.all()

      const order = await Order.find(id)
      if(order == null)
        return response.status(404).send({'message':'Data not found!'})

      let totalPrice = await price*qty;
      await order.merge({
        qty: qty,
        price: totalPrice
      })
      await order.save()

      return response.status(200).send({'message': 'Data updated success', data: order})
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async destroy ({ params, request, response }) {
    try{
    const { id } = params
    const order = await Database
                        .table('orders')
                        .innerJoin('products', 'orders.product_id', 'products.id')
                        .where('orders.product_id',id)
                        .delete()
    return response.status(200).send({'message' : 'Data deleted success', data: order})
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }

}

module.exports = OrderController
