export interface UserInterface {
  userId?: number
  avatar?: string
  firstname: string
  lastname: string
  email: string
  password?: string
  passwordconfirm?: string
  visibility: 'public' | 'private'
}
