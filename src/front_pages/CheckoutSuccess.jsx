import axios from "axios";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { updateCartData } from "../redux/cartSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../LoadingContext";
import ScreenLoading from "../components/ScreenLoading";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function CheckoutSuccess() {
    const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    // 結帳完成後的訂單資訊
    useEffect(() => {
        getCartList();
        const specifiedOrder = localStorage.getItem("specifiedOrder");
        if (specifiedOrder) {
            const parsedSpecData = JSON.parse(specifiedOrder);
            console.log(parsedSpecData);
            setData(parsedSpecData);
        }
    }, []);

    // 取得購物車內容
    const getCartList = async () => {
        setIsScreenLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/api/${apiPath}/cart`);
            dispatch(updateCartData(res.data.data));
        } catch (error) {
            showSwalError("取得購物車失敗", error.response?.data?.message);
        } finally {
            setIsScreenLoading(false);
        }
    };

    // sweetalert錯誤提示
    const showSwalError = (text, error) => {
        withReactContent(Swal).fire({
            title: text,
            text: error,
            icon: "error",
        });
    };

    // 時間格式化
    const formatTime = (timeStamp) => {
        const time = new Date(timeStamp * 1000);

        // console.log(time)
        return `${time.getFullYear()}/${
            time.getMonth() + 1
        }/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    };
    // console.log("時間戳轉換:", formatTime(data.create_at));

    return (
        <div className="container-fluid">
            <div className="container">

            
                <div
                    className="position-absolute"
                    style={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                        backgroundPosition: "center center",
                        opacity: 0.6,
                        zIndex: -1,
                    }}
                ></div>
                <div className="position-relative d-flex">
                    <div
                        className="container d-flex flex-column"
                        style={{ minHeight: "100vh" }}
                    >
                        {/* <nav className="navbar navbar-expand-lg navbar-light px-0">
                            <a className="navbar-brand" href="./index.html">
                                Navbar
                            </a>
                        </nav> */}
                        <div className="row my-auto pb-7 justify-content-center">
                            <div className="col-md-8 d-flex flex-column align-items-center text-center"
                                style={{
                                    background: 'rgba(163, 158, 158, 0.42)',  // 背景色：黑色 + 10% 透明
                                    borderRadius: '12px', // 圓角邊緣
                                    padding: '1.5rem' // 內距，避免內容貼邊
                                }}
                                >
                                {/* <div className="my-auto bg-light opacity-50 rounded-3 p-6"> */}
                                <div className="my-auto">
                                    <h3>感謝您的購買!</h3>
                                    <p>
                                        訂單金額:NT${data?.total?.toLocaleString()}
                                        <br />
                                        訂單成立時間:{formatTime(data?.create_at)}
                                        <br />
                                        訂單號碼:{data?.id}
                                    </p>
                                    <p className="mt-3 fs-6">
                                        我們已收到您的付款與訂單，將在3個工作天內回覆確認。
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
                    {/* <div
                        className="w-md-50 w-100 position-absolute opacity-1"
                        style={{
                            zIndex: -1,
                            minHeight: "100vh",
                            right: 0,
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
                            backgroundPosition: "center center",
                        }}
                    ></div> */}
                </div>
                {isScreenLoading && <ScreenLoading />}
            </div>
        </div>
    );
}

export default CheckoutSuccess;
