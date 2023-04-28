import { atom } from 'recoil'
import { UserInterface } from '../interfaces/user'

export const currentUserState = atom<UserInterface | null>({
  key: 'currentUserState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})
