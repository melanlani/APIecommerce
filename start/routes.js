'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Grouped Product
Route.group(() => {
  Route.get('/products', 'ProductController.index')
  Route.get('/products/:id', 'ProductController.show')
  Route.post('/product', 'ProductController.store')
}).prefix('api/v1')

// Grouped Order
Route.group(() => {
  Route.get('/orders', 'OrderController.index')
  Route.get('/orders/:id', 'OrderController.show')
  Route.post('/order', 'OrderController.store')
  Route.patch('/order/:id', 'OrderController.update')
  Route.delete('/order/:id', 'OrderController.destroy')
}).prefix('api/v1')

// Grouped User
Route.group(() => {
  Route.post('/register', 'UserController.register')
  Route.post('/login', 'UserController.login')
  Route.get('/users', 'UserController.index').middleware('auth')
}).prefix('api/v1')
