import { findUserByEmail } from "./src/service/user.service";
import { signAccessToken } from "./src/service/auth.service"
// require('dotenv').config();
// const config = require('config')
// const { signJwt } = require("./src/utils/jwt")
// const jwt = require('jsonwebtoken')

// const get = Buffer.from(config.get("refreshTokenPrivateKey", "base64").toString("ascii")) 

// const token = config.get("refreshTokenPrivateKey")
// const environment = process.env.TEST
// const signed = jwt.sign({name:"phil"}, token)
// const accesstoken = signAccessToken({name:"bill"})
async function extract() {
  const user = await findUserByEmail("wilma.lindsey@example.com")
  const accessToken = signAccessToken(user)
  console.log(accessToken)
  return accessToken
}
extract()
