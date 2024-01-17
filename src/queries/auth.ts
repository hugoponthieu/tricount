let jwt = require('jsonwebtoken');
require('dotenv').config()
const authorization = (request, response,next) => {
    const token = request.cookies["access_token"];
    if (!token) {
        return response.status(403).json({message:'Token invalid'});
    }
    try {
      const data = jwt.verify(token, process.env.PRIVATE_KEY);
      request.userId = data.id;  
      next()
    } catch {
        return response.status(403).json({message:'Token invalid'});
    }
  };
export{ authorization };
  