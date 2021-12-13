const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get the token from the browser.
    const token = req.headers.authorization.split(' ')[1];
    
    // Check the length of the token to see if it is created with our app.
    // Google Auth tokens are larger than 500.
    const isCustomAuth = token.length < 500;

    let decodedData;

    if(token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);

      // store the user id of the token.
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // .sub is a Google specific id to differentiate every Google user.
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = auth;