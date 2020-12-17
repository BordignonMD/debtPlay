const connection  = require('../database/connection')
const Password = require('../utils/index')

module.exports = {
  async index(request, response) {
    const users = await connection('user').select('*')

    return response.json(users)
 },

  async create(request, response) {
    const { name, email, password } = request.body

    const salt = Password.getSalt();
    const hash = Password.sha512(password, salt);

    const id_client = await connection('user')
      .returning('id_client')  
      .insert({
        name,
        email,
        password: hash,
        salt
      })

    return response.json({ id_client })
  }
}