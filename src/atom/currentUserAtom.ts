import { atom } from "recoil";
import {UserInterface} from "../interfaces/user"

interface userInterface {
  email: string;
  userId: string;
  firstname: string;
  lastname: string;
}

export const currentUserState = atom<UserInterface | null>({
  key: "currentUserState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
