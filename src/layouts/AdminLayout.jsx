import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router";

import Toast from "../components/Toast";
import { pushMessage } from "../redux/toastSlice";
import { useCallback, useEffect } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

const routes = [
  { path: "/", name: "客戶首頁" },
  { path: "/admin/admin-product", name: "產品管理" },
  { path: "/admin/orders", name: "訂單管理" },
  { path: "/admin/coupons", name: "優惠券管理" },
];

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 確認使用者是否已登入
  const checkingUserLogin = useCallback(() => {
    const token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    const checkUserLogin = async () => {
      try {
        await axios.post(`${baseUrl}/api/user/check`);
      } catch (error) {
        alert(error.response.data.message);
        navigate("/login");
      }
    };

    checkUserLogin();
  }, [navigate]);

  // 預設取得產品 & 取得產品前確認使用者是否登入
  useEffect(() => {
    checkingUserLogin();
  }, [checkingUserLogin, navigate]);

  // 登出功能
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
                  className={`nav-link ${route.path === "/admin" ? "exact" : ""} `}
                  aria-current="page"
                  to={route.path}
                  key={route.path}
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
      <Toast />
      <Outlet />
    </>
  );
}

export default AdminLayout;
