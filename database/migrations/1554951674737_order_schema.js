'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('product_id').unsigned()
      table
          .foreign('product_id')
          .references('products.id')
          .onDelete('cascade')
          .onUpdate('cascade')
      table.integer('qty')
      table.double('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
