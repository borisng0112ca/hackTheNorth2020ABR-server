const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = 'hackthenorth2020abr';

async function auth (req, res, proceed){
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {      
      let decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
      proceed();
    }  
  } 
  catch (error) {
    console.log(error);
  }
}

module.exports = auth;