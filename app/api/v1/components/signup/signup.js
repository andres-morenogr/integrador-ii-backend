require('dotenv').config();
const {
  USER_POOL_ID,
  CLIENT_ID
} = require('../../../../../config/config');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const register = async (body) => {
  let name = body.name;
  let email = body.email;
  let password = body.password;
  let attributeList = [];

  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email }));
  const user = await signUp(name, password, attributeList, null);
  return signUp
}

const signUp = async (...args) => {
  return new Promise((resolve, reject) => {
    console.log(...args);
    userPool.signUp(...args, (err, result) => {
      if (err) {
        reject(err);
      }
      let cognitoUser = result.user;
      resolve(cognitoUser);
    })
  })
}

module.exports = {
  register
};