import { User } from "../types";
import { remove, save } from "./localStorage.service";

export const saveUser = (user: User, token: string) => {
  save("user", JSON.stringify(user));
  save("token", token);
};

export const logout = () => {
  remove("user");
};
