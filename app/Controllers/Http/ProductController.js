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

  async show ({ params, request, response, view, auth }) {

    const products = await Product.find(params.id)

    return {
      data: products
    }

  }
}

module.exports = ProductController
