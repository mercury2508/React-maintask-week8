import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import { updateCartData } from "../../redux/cartSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const routes = [
    { path: "/", name: "首頁" },
    { path: "/products", name: "行程一覽" },
    { path: "/about", name: "關於我們" },
    { path: "/cart", name: "購物車" },
    // { path: "/login", name: "登入" },
];

function Header() {
    const qty = useSelector((state) => state.cart.qty);

    const dispatch = useDispatch();

    useEffect(() => {
        getCartList();
    }, []);

    // 取得購物車內容
    const getCartList = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/${apiPath}/cart`);
            dispatch(updateCartData(res.data.data));
        } catch (error) {
            // showSwalError("取得購物車失敗", error.response?.data?.message);
            console.log("取得購物車失敗", error.response?.data?.message);
        }
    };

    return (
        <div className="container d-flex flex-column">
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/">
                    Navbar
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        {routes.map((route) => (
                            <NavLink
                                className="nav-item nav-link me-4"
                                key={route.path}
                                to={route.path}
                            >
                                <span className="sr-only">(current)</span>
                                {route.name === "購物車" ? (
                                    <div className="position-relative">
                                        <i className="fas fa-shopping-cart"></i>
                                        <span
                                            className="position-absolute badge text-bg-success rounded-circle"
                                            style={{
                                                bottom: "12px",
                                                left: "12px",
                                            }}
                                        >
                                            {qty}
                                        </span>
                                    </div>
                                ) : (
                                    route.name
                                )}
                            </NavLink>
                        ))}
                        {/* <NavLink className="nav-item nav-link me-4" to="">
                            首頁 <span className="sr-only">(current)</span>
                        </NavLink>
                        <NavLink
                            className="nav-item nav-link me-4"
                            to="/products"
                        >
                            行程一覽
                        </NavLink>
                        <NavLink className="nav-item nav-link me-4" to="/about">
                            關於我們
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                        </NavLink> */}
                        {/* <nav
                                className="navbar bg-dark border-bottom border-body"
                                data-bs-theme="dark"
                            >
                                <div className="container">
                                    <ul className="navbar-nav flex-row gap-5 fs-5">
                                        {routes.map((route) => (
                                            <li className="nav-item" key={route.path}>
                                                <NavLink
                                                    className="nav-link"
                                                    aria-current="page"
                                                    to={route.path}
                                                >
                                                    {route.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </nav> */}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
