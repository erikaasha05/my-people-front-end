import { Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FourOhFour from "./pages/404";
import Map from "./components/Map";

export const routes = [
  {
    element: <Login />,
    path: "/",
  },
  {
    element: <App />,
    path: "/dashboard",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <FourOhFour />,
    path: "/404",
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
  {
    element: <Map />,
    path: "/map"
  }
];
