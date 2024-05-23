import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import { Home } from "./screens/Home";
import { Platforms } from "./screens/Plaforms";
import { HowItWorks } from "./screens/HowItWorks";
import { Login } from "./screens/Auth/Login";
import { Register } from "./screens/Auth/Register";
import { PromptDetail } from "./screens/Prompt/PromptDetail";
import { ForgotPassword } from "./screens/Auth/ForgotPassword";
import { ForgotPasswordSuccess } from "./screens/Auth/ForgotPasswordSuccess";
import { ValidateEmail } from "./screens/Auth/ValidateEmail";
import { ValidationSuccess } from "./screens/Auth/ValidationSuccess";
import { ResetPassword } from "./screens/Auth/ResetPassword";
import { ResetPasswordSuccess } from "./screens/Auth/ResetPasswordSuccess";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/platforms", element: <Platforms /> },
  { path: "/become-creator", element: <div>Become a Creator</div> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/forgot-password-success", element: <ForgotPasswordSuccess /> },
  { path: "/prompt/:id", element: <PromptDetail /> },
  { path: "/validate-email/:email", element: <ValidateEmail /> },
  { path: "/validation-success", element: <ValidationSuccess /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/reset-password-success", element: <ResetPasswordSuccess /> },
  { path: "*", element: <div>Not Found</div> },
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
