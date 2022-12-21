import { atom } from "recoil";

interface userInterface {
  email: string;
}

export const currentUserState = atom<userInterface | null>({
  key: "currentUserState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
