import { get } from 'lodash'
import { Request, Response } from 'express'
import { CreateSessionInput } from '../schema/auth.schema'
import { signAccessToken, signRefreshToken } from '../service/auth.service'
import { findSessionById, findUserByEmail, findUserById } from '../service/user.service'
import { verifyJwt } from '../utils/jwt'

export async function createSessionHanlder(req: Request<{}, {}, CreateSessionInput>, res: Response) {
  const { email, password } = req.body

  const message = "Invalid email or password"

  const user = await findUserByEmail(email)

  if (!user) {
    return res.send(message)
  }

  if (!user.verified) {
    return res.send("Please verify your email")
  }

  const isValid = await user.validatePassword(password)

  if (!isValid) {
    return res.send(message)
  }

  // sign a access token 
  const accessToken = signAccessToken(user)
  // sign a refresh token 
  const refreshToken = await signRefreshToken({ userId: user._id })
  // send the tokens 
  return res.send({
    accessToken,
    refreshToken
  })
}

export async function refreshAcessTokenHandler(req: Request, res: Response) {
  const errorMsg = "Could not refresh access token"
  const refreshToken = get(req, 'headers.x-refresh')

  const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey')

  if (!decoded) {
    return res.status(401).send(errorMsg)
  }

  const session = await findSessionById(decoded.session)

  if (!session || !session.valid) {
    return res.status(401).send(errorMsg)
  }

  const user = await findUserById(String(session.user))

  if (!user) {
    return res.status(401).send(errorMsg)
  }

  const accessToken = signAccessToken(user)

  return res.send({ accessToken })
}

