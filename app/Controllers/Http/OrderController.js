'use strict'
const Order = use('App/Models/Order')
const Database = use("Database");

class OrderController {

  async index ({ request, response, view }) {

    const orders = await Database
                        .table('orders')
                        .innerJoin('products', 'orders.product_id', 'products.id')

    return {
      data: orders
    }

  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const {price, qty, product_id} = request.post();
    const order = new Order();
    order.price = price;
    order.qty = qty;
    order.product_id = product_id;
    await order.save();

    return {
      message: "data saved success",
      data: order
    }

  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {

    const {id} = params;
    const order = await Order.find(id);

    if(order){
      const {qty} = request.post();
      order.qty = qty;
      await order.save();
      return{
        message: 'Data updated success',
        data: order
      }
    }else{
      return{
        message: 'Data failed to updated.',
        data: id
      }
    }

  }

  async destroy ({ params, request, response }) {

    const {id} = params;
    const order = await Order.find(id);
    await order.delete();
    return{
      message: 'Data deleted success',
      data: id
    }

  }
}

module.exports = OrderController
