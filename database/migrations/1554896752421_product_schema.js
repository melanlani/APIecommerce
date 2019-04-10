'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('nameProduct', 50).notNullable()
      table.string('priceHolder', 50).notNullable()
      table.string('imageHolder', 300)
      table.string('quantity', 50).notNullable()
      table.string('navProduct', 100)
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
