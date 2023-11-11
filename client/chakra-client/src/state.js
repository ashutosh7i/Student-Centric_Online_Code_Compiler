//Global state using recoil
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});
