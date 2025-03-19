import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import { updateCartData } from "../../redux/cartSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const routes = [
    { path: "/", name: "首頁" },
    { path: "/products", name: "行程一覽" },
    { path: "/about", name: "關於我們" },
    { path: "/cart", name: "購物車" },
    { path: "/service", name: "常見問題" },
    { path: "/login", name: "登入" },
];

function Header() {
    const qty = useSelector((state) => state.cart.qty);
    const dispatch = useDispatch();

    useEffect(() => {
        // 取得購物車內容
        const getCartList = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/${apiPath}/cart`);
                dispatch(updateCartData(res.data.data));
            } catch (error) {
                showSwalError("取得購物車失敗", error.response?.data?.message);
            }
        };

        getCartList();
    }, [dispatch]);

    // sweetalert錯誤提示
    const showSwalError = (text, error) => {
        withReactContent(Swal).fire({
            title: text,
            text: error,
            icon: "error",
        });
    };

    // Navbar開關
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/">
                    筑紫旅遊
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse justify-content-end ${
                        isOpen ? "show" : ""
                    }`}
                >
                    <div className="navbar-nav">
                        {routes.map((route) => (
                            <NavLink
                                className="nav-item nav-link me-lg-4"
                                key={route.path}
                                to={route.path}
                                onClick={() => setIsOpen(false)}
                            >
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
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
