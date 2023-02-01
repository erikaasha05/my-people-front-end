import App from "./App"
import Login from "./pages/Login";
import Signup from "./pages/Signup";


export const routes = [
  {
    element: <App />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup"
  }
];