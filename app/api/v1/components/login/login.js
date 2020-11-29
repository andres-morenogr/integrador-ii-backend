require('dotenv').config();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const {
  USER_POOL_ID,
  CLIENT_ID
} = require('../../../../../config/config');

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const login = async (body) => {
  let userName = body.name;
  let password = body.password;
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: userName,
    Password: password
  });
  let userData = {
    Username: userName,
    Pool: userPool
  }
  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  return await authenticate(cognitoUser, authenticationDetails);
};

const authenticate = async (cognitoUser, authenticationDetails) => {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        let accesstoken = result.getAccessToken().getJwtToken();
        resolve(accesstoken);
      },
      onFailure: ((err) => {
        reject(err);
      })
    })
  })
}

module.exports = login;