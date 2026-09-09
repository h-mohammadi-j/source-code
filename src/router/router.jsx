import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Customers from "../pages/Customers";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";

const router = createBrowserRouter(
  [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/payment",
    element: <Payment />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]
,
{
  basename: "/source-code"
}
);

export default router