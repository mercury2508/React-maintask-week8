// const routes = [
//     { path: "/", name: "首頁" },
//     { path: "/products", name: "產品列表" },
//     { path: "/cart", name: "購物車" },
//     { path: "/login", name: "登入" },
// ];

import { Link, NavLink } from "react-router";

function Header() {
    return (
        <div className="container d-flex flex-column">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="./index.html">
                    Navbar
                </a>
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
                        <NavLink
                            className="nav-item nav-link me-4 active"
                            to=""
                        >
                            首頁 <span className="sr-only">(current)</span>
                        </NavLink>
                        <NavLink
                            className="nav-item nav-link me-4"
                            to="/products"
                        >
                            行程一覽
                        </NavLink>
                        <button
                            className="nav-item nav-link me-4"
                            // href="./detail.html"
                        >
                            精選行程
                        </button>
                        <NavLink className="nav-item nav-link" to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                        </NavLink>
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
