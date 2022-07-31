import { Request, Response } from 'express'
import { CreateUserInput, VerifyUserInput, ForgotPasswordInput, ResetPasswordInput } from '../schema/user.schema';
import { createUser, findUserById, findUserByEmail } from '../service/user.service';
import sendEmail from '../utils/mailer';
import log from '../utils/logger';
import { nanoid } from 'nanoid';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  const body = req.body

  try {
    const user = await createUser(body);

    await sendEmail({
      from: 'nefs@example.com',
      to: user.email,
      subject: "please verify your account",
      text: `verification email sent to ${user.verificationCode}. id: ${user._id}`
    })

    return res.send("User successfully created")
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Account already exists")
    }
    return res.status(500).send(e.message)
  }
}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
  const id = req.params.id
  const verificationCode = req.params.verificationCode

  // find the user by id
  const user = await findUserById(id)
  if (!user) {
    return res.send(`Could not verify user`)
  }

  //check to see if they are already varified
  if (user.verified) {
    return res.send('User is already verified')
  }

  //check to see if the verificationCode matches 
  if (user.verificationCode === verificationCode) {
    user.verified = true
    await user.save();
    return res.send("User successfully verified")
  }
  // if any error
  return res.send('could not varify user')
}


export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
  const message = "If a user with that email is registered you will recieve a reset email"
  const { email } = req.body

  const user = await findUserByEmail(email)

  if (!user) {
    log.debug(`User with email ${email} does not exist`)
    return res.send(message)
  }

  if (!user.verified) {
    return res.send("User is not verified")
  }

  const passwordResetCode = nanoid()
  user.passwordResetCode = passwordResetCode
  await user.save()

  await sendEmail({
    to: user.email,
    from: "test@gmail.com",
    subject: "Reset your password",
    text: `Password reset code ${passwordResetCode}. ID: ${user._id}`
  })

  log.debug(`Password reset email sent to ${email}`)
  return res.send(message)
}

export async function resetPasswordHandler(req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response) {

  const { id, passwordResetCode } = req.params
  const { password } = req.body

  const user = await findUserById(id);

  if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
    return res.status(400).send("Could not reset user password")
  }

  user.passwordResetCode = null
  user.password = password

  await user.save()
  return res.send('Successfully updated user password')

}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user)
}

