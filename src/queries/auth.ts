let jwt = require('jsonwebtoken');

const authorization = (request, response,next) => {
    const token = request.cookies["access_token"];
    if (!token) {
        return response.status(403).json({message:'Token invalid'});
    }
    try {
      const data = jwt.verify(token, "UNBROCABLE_KEY");
      request.userId = data.id;  
      next()
    } catch {
        return response.status(403).json({message:'Token invalid'});
    }
  };
export{ authorization };
  