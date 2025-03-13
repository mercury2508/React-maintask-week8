import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router";

import Toast from "../components/Toast";
import { pushMessage } from "../redux/toastSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;

const routes = [
    { path: "/home", name: "客戶首頁" },
    { path: "/admin", name: "產品管理" },
    { path: "/admin/orders", name: "訂單管理" },
    // { path: "/admin/coupons", name: "優惠券管理" },
];

function AdminLayout() {
    const dispatch = useDispatch();

    // 登出功能
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post(`${baseUrl}/logout`);
            alert("已成功登出");
            navigate("/login");
            document.cookie = "hexToken=; max-age=0; path=/";
        } catch (error) {
            dispatch(
                pushMessage({
                    text: error.message,
                    status: "failed",
                })
            );
            console.log("handleLogout:", error);
        }
    };

    return (
        <>
            <nav
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
                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm"
                            onClick={() => handleLogout()}
                        >
                            登出
                        </button>
                    </ul>
                </div>
            </nav>

            {/* <div className="container d-flex flex-column">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/">
                        返回用戶首頁
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
                                    {route.name}
                                </NavLink>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline-light btn-sm"
                                onClick={() => handleLogout()}
                            >
                                登出
                            </button>
                        </div>
                    </div>
                </nav>
            </div> */}
            <Toast />
            <Outlet />
        </>
    );
}

export default AdminLayout;
