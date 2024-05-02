import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import { Home } from "./screens/Home";

const routes = [
  { path: "/", element: <Home /> },
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
