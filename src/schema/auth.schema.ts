import { object, string, TypeOf } from "zod"

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required"
    }).email("Invalid email or password"),
    password: string({
      required_error: "password is required"
    }).min(6, "Passowrd is required")
  })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body']
