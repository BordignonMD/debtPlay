const connection = require('../database/connection');
const Password = require('../utils/index')
const jwt = require('jsonwebtoken');

require("dotenv-safe").config();

async function create(request, response) {
  const { email, password } = request.body;

  try {
    const {salt} = await connection('user')
    .where('email', email)
    .select('salt')
    .first()

    if (!salt) {
      return response.status(400).json({error: 'Nenhum usuário encontrado com esse e-mail.'})
    }

    const hash = Password.sha512(password, salt);

    const user = await connection('user')
      .where({email: email, password: hash})
      .select(['name', 'id_user'])
      .first();
    if (!user) {
      return response.status(400).json({ error: 'Senha incorreta' });
    }

    const token_jwt = jwt.sign({name: user.name}, process.env.SECRET, {
      expiresIn: 300
    })

    return response.json({user, auth: "true", token: token_jwt});
  }catch(err){
    return response.status(400).json({error: 'Nenhum usuário encontrado.'})
  }
}

module.exports = { create };