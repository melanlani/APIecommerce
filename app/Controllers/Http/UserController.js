'use strict'
const User = use('App/Models/User')

class UserController {

  async register({ request, response}){
    const data = await request.only(['username','email','password'])
    const user = await User.create(data)

    return response.status(201).send(user)
  }

  async login({ request, response, auth}){
    try{
    const {email, password} = await request.all()
    const user = await auth.attempt(email, password)

    return response.status(200).send({'message': 'Logged in successfully', data: user})
  }
    catch (e) {
      console.log(e);
      return {'message':'Email/password is wrong!'}
    }
  }

  async index({request, response, auth}){
    const users = await User.all()
    return response.status(200).send(users)
  }
}

module.exports = UserController
