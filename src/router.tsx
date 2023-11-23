import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./views/Home";
import Coin from "./views/Coin";
import ErrorPage from "./views/ErrorPage";
import Chart from "./components/Chart";
import Price from "./components/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":coinID",
        element: <Coin />,
        children: [
          {path: "price", element: <Price />},
          {path: "chart", element: <Chart />},
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
