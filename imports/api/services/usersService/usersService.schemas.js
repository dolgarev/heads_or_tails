import SimpleSchema from 'simpl-schema'

export const createUserSchema = new SimpleSchema({
  email: SimpleSchema.RegEx.Email,
  password: String
})
