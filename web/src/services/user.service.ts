import { User } from "../types";
import { remove, save } from "./localStorage.service";

export const saveUser = (user: User, token?: string) => {
  save("user", JSON.stringify(user));
  if (token) {
    save("token", token);
  }
};

export const logout = () => {
  remove("user");
};
