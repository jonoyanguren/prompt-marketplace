import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import { Home } from "./screens/Home";
import { HowItWorks } from "./screens/HowItWorks";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/platforms", element: <div>Platforms</div> },
  { path: "/become-creator", element: <div>Become a Creator</div> },
  { path: "/login", element: <div>Login</div> },
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
