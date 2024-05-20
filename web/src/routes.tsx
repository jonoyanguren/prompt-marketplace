import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import { Home } from "./screens/Home";
import { Platforms } from "./screens/Plaforms";
import { HowItWorks } from "./screens/HowItWorks";
import { Login } from "./screens/Auth/Login";
import { Register } from "./screens/Auth/Register";
import { PromptDetail } from "./screens/Prompt/PromptDetail";
import { ForgotPassword } from "./screens/Auth/ForgotPassword";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/platforms", element: <Platforms /> },
  { path: "/become-creator", element: <div>Become a Creator</div> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/prompt/:id", element: <PromptDetail /> },
];

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </ReactRouterRoutes>
  );
};
