import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import { Home } from "./screens/Home";
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
import { Platforms } from "./screens/Platforms/Platforms";
import { CheckoutScreen } from "./screens/Payments/CheckoutScreen";
import { Profile } from "./screens/Profile/Profile";
import { CreatePrompt } from "./screens/Prompt/Create/CreatePrompt";
import { Checkout } from "./screens/Prompt/Payment/Checkout";

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
  { path: "/checkout-form", element: <CheckoutScreen /> },
  { path: "/profile", element: <Profile /> },
  { path: "/create-prompt", element: <CreatePrompt /> },
  { path: "/create-prompt-success", element: <div>Create Prompt Success</div> },
  { path: "/checkout/:promptId", element: <Checkout /> },
  { path: "*", element: <div>Route Not Found</div> },
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
