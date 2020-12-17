const crypto = require('crypto');

function getSalt(){
  return crypto.randomBytes(16)
          .toString('hex')
          .slice(0,16); 
};

function sha512(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  
  var hash = hash.digest('hex');

  return hash;
};

module.exports = { getSalt, sha512 };