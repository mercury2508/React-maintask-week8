import { Link } from "react-router";

function CheckoutSuccess() {
    return (
        <div className="container-fluid">
            <div className="position-relative d-flex">
                <div
                    className="container d-flex flex-column"
                    style={{ minHeight: "100vh" }}
                >
                    <nav className="navbar navbar-expand-lg navbar-light px-0">
                        <a className="navbar-brand" href="./index.html">
                            Navbar
                        </a>
                    </nav>
                    <div className="row my-auto pb-7">
                        <div className="col-md-4 d-flex flex-column">
                            <div className="my-auto">
                                <h2>付款成功</h2>
                                <p>
                                    我們已收到您的訂單，並將在3個工作天內回覆確認。
                                    <br />
                                    如有任何問題，請隨時透過電話或電子郵件與我們聯繫，我們將盡快為您處理！
                                    <br />
                                    期待為您帶來美好的旅程！🌍✨
                                </p>
                                <Link
                                    to="/"
                                    className="btn btn-outline-dark mt-4 px-5"
                                >
                                    返回首頁
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="w-md-50 w-100 position-absolute opacity-1"
                    style={{
                        zIndex: -1,
                        minHeight: "100vh",
                        right: 0,
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
                        backgroundPosition: "center center",
                    }}
                ></div>
            </div>
        </div>
    );
}

export default CheckoutSuccess;
