const {
  USER_POOL_ID,
  CLIENT_ID,
  POOL_REGION
} = require('../../config/config');

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
};

const request = require('request')
const jwkToPem = require('jwk-to-pem')
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  let token = req.headers['authorization'];
  request({
    url: `https://cognito-idp.${POOL_REGION}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      pems = {};
      let keys = body['keys'];
      for (let i = 0; i < keys.length; i++) {
        let key_id = keys[i].kid;
        let modulus = keys[i].n;
        let exponent = keys[i].e;
        let key_type = keys[i].kty;
        let jwk = { kty: key_type, n: modulus, e: exponent };
        let pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      let decodedJwt = jwt.decode(token, { complete: true });
      if (!decodedJwt) {
        console.log("Not a valid JWT token");
        res.status(401);
        return res.send({message:"Invalid token"});
      }
      let kid = decodedJwt.header.kid;
      let pem = pems[kid];
      if (!pem) {
        console.log('Invalid token');
        res.status(401);
        return res.send({message:"Invalid token"});
      }
      jwt.verify(token, pem, function (err, payload) {
        if (err) {
          console.log("Invalid Token.");
          res.status(401);
          return res.send({message:"Invalid token"});
        } else {
          req.userdata = decodedJwt.payload;
          console.log("Valid Token.");
          return next();
        }
      });
    } else {
      console.log("Error! Unable to download JWKs");
      res.status(500);
      return res.send({message:"Error! Unable to download JWKs"});
    }
  });
}

module.exports = {
  validateToken
}
