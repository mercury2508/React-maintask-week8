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
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default FrontLayout;
