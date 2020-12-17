const jwt = require('jsonwebtoken');
const { promisify } = require('util');

require("dotenv-safe").config();

async function validate(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const [, token] = authorization.split(' ');

    try {
      await promisify(jwt.verify)(token, process.env.SECRET);
  
      return next();
    } catch (err) {
      console.log(err)
      return res.sendStatus(401);
    }
  }
  
  module.exports = validate;