'use strict'

const Product = use('App/Models/Product')

class ProductController {

  async index ({ request, response, view }) {

    const products = await Product.all()

    return {
      data: products
    }

  }

  async store ({ request }) {

    const product= await Product.create(request.all())

    return {
      message: "success",
      data: product
    }

  }
}

module.exports = ProductController
