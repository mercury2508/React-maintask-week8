import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

function FrontLayout() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }, [pathname]);

    return (
        <>
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
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default FrontLayout;
