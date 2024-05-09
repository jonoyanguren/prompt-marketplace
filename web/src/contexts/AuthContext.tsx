import { createContext, useEffect, useState } from "react";
import { User } from "../types";

interface UserContextProps {
  user: User | null;
  token: string | null;
  updateUser: (user: User) => void;
  updateToken: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<UserContextProps>({
  user: null,
  token: null,
  updateUser: () => {},
  updateToken: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user) {
      setUser(JSON.parse(user));
    }

    if (token) {
      setToken(token);
    }
  }, []);

  const updateUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const updateToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const context = {
    user,
    token,
    updateToken,
    updateUser,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
