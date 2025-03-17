import { createHashRouter } from "react-router";

import FrontLayout from "../layouts/FrontLayout";
import Home from "../front_pages/Home";
import Products from "../front_pages/Products";
import ProductDetail from "../front_pages/ProductDetail";
import Cart from "../front_pages/Cart";
import CheckoutForm from "../front_pages/CheckoutForm";
import CheckoutPayment from "../front_pages/CheckoutPayment";
import CheckoutSuccess from "../front_pages/CheckoutSuccess";
import About from "../front_pages/About";
import Service from "../front_pages/Service"
import Insurances from "../front_pages/Insurances";
import LoginPage from "../front_pages/Login";

import AdminLayout from "../layouts/AdminLayout";
import AdminProducts from "../admin_pages/AdminProducts";
import Orders from "../admin_pages/Orders";
import Coupon from "../admin_pages/Coupon";

import NotFound from "../front_pages/NotFound";

const router = createHashRouter([
    {
        path: "/",
        element: <FrontLayout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "products/:id",
                element: <ProductDetail />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "checkout-form",
                element: <CheckoutForm />,
            },
            {
                path: "checkout-payment",
                element: <CheckoutPayment />,
            },
            {
                path: "checkout-success",
                element: <CheckoutSuccess />,
            },
            {
                path: "service",
                element: <Service/>
            },
            {
                path: "insurance",
                element: <Insurances/>
            },
        ],
    },
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "admin",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <AdminProducts />,
            },
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "coupons",
                element: <Coupon />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
