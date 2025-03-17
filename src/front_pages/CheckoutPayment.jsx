import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { LoadingContext } from "../LoadingContext";
import ScreenLoading from "../components/ScreenLoading";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function CheckoutPayment() {
    const { isScreenLoading, setIsScreenLoading } =
        useContext(LoadingContext);
    const navigate = useNavigate();
    const [cartItem, setCartItem] = useState({});

    useEffect(() => {
        getCartList();
    }, []);

    //取得購物車內容
    const getCartList = async () => {
        setIsScreenLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/api/${apiPath}/cart`);
            setCartItem(res.data.data);
        } catch (error) {
            showSwalError("取得購物車失敗", error.response?.data?.message);
        } finally {
            setIsScreenLoading(false);
        }
    };

    // sweetalert結帳成功提示
    const showSwalSuccess = (text) => {
        withReactContent(Swal).fire({
            title: text,
            icon: "success",
        });
    };

    // sweetalert錯誤提示
    const showSwalError = (text, error) => {
        withReactContent(Swal).fire({
            title: text,
            text: error,
            icon: "error",
        });
    };

    // 表單驗證
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    // 送出結帳 & 信用卡資料(未使用)
    const onSubmitFinal = handleSubmit((data) => {
        const { ...user } = data;
        const cardData = {
            data: {
                user,
            },
        };
        console.log(cardData);//信用卡資料未使用(避免出現紅字的log)
        getOrderInfo();
    });

    // 取得客戶資料
    const getOrderInfo = () => {
        const savedOrderData = localStorage.getItem("submitData");
        let orderData = {};
        if (savedOrderData) {
            orderData = JSON.parse(savedOrderData);
        }
        sendOrder(orderData);
    };

    // 送出訂單
    const sendOrder = async (orderData) => {
        let bookingId = "";
        try {
            const res = await axios.post(
                `${baseUrl}/api/${apiPath}/order`,
                orderData
            );
            bookingId = res.data.orderId;
            if (res.data.success) {
                getSpecifiedOrder(bookingId);
                checkout(bookingId);
            }
        } catch (error) {
            showSwalError("送出訂單失敗", error.response?.data?.message);
        }
    };

    // 客戶購物結帳
    const checkout = async (id) => {
        setIsScreenLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/api/${apiPath}/pay/${id}`);
            reset();
            if (res.data.success) {
                showSwalSuccess("結帳成功!");
                navigate(`/checkout-success`);
            }
            localStorage.removeItem("submitData");
        } catch (error) {
            showSwalError("結帳失敗", error.response?.data?.message);
        } finally {
            setIsScreenLoading(false);
        }
    };

    // 取得指定訂單
    const getSpecifiedOrder = async (orderId) => {
        try {
            const res = await axios.get(
                `${baseUrl}/api/${apiPath}/order/${orderId}`
            );
            localStorage.setItem("specifiedOrder", JSON.stringify(res.data.order));
        } catch (error) {
            showSwalError(
                "getSpecifiedOrder失敗",
                error.response?.data?.message
            );
        }
    };

    // 返回上一頁
    const handleGoBack = () => {
        navigate("/checkout-form");
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <nav className="navbar navbar-expand-lg navbar-light px-0">
                        <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                            <li className="me-md-6 me-3 position-relative custom-step-line">
                                <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                                <span className="text-nowrap">建立訂單</span>
                            </li>
                            <li className="me-md-6 me-3 position-relative custom-step-line">
                                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                                <span className="text-nowrap">確認付款</span>
                            </li>
                            <li>
                                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                                <span className="text-nowrap">結帳完成</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h3 className="fw-bold mb-4 pt-3">確認付款</h3>
                </div>
            </div>
            <div className="row flex-row-reverse justify-content-center pb-5">
                <div className="col-md-4">
                    <div className="border p-4 mb-4">
                        {cartItem?.carts?.map((item) => (
                            <div className="d-flex mb-2" key={item.id}>
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.title}
                                    className="me-2"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="w-100">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-0 fw-bold">
                                            {item.product.title}
                                        </p>
                                        <p className="mb-0">
                                            NT${item?.total?.toLocaleString()}
                                        </p>
                                    </div>
                                    <p className="mb-0 fw-bold">x{item.qty}</p>
                                </div>
                            </div>
                        ))}
                        <table className="table mt-4 border-top border-bottom text-muted">
                            <tbody>
                                <tr>
                                    <th
                                        scope="row"
                                        className="border-0 px-0 pt-4 font-weight-normal"
                                    >
                                        金額小計
                                    </th>
                                    <td className="text-end border-0 px-0 pt-4">
                                        NT${cartItem?.total?.toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        scope="row"
                                        className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                                    >
                                        結帳
                                    </th>
                                    <td className="text-end border-0 px-0 pt-0 pb-4">
                                        信用卡一次付清
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between mt-4">
                            <p className="mb-0 h4 fw-bold">總計</p>
                            <p className="mb-0 h4 fw-bold">
                                NT${cartItem?.final_total?.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 付款方式 */}
                <div className="col-md-6">
                    <div className="accordion" id="accordionExample">
                        <form
                            className="col"
                            action=""
                            onSubmit={onSubmitFinal}
                        >
                            <div className="mb-3">
                                <label htmlFor="cardNum" className="form-label">
                                    信用卡號
                                </label>
                                <input
                                    id="cardNum"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="16"
                                    className={`form-control ${
                                        errors.cardNum ? "is-invalid" : ""
                                    }`}
                                    placeholder="請輸入16位號碼"
                                    {...register("cardNum", {
                                        required: {
                                            value: true,
                                            message: "卡號為必填",
                                        },
                                        pattern: {
                                            value: /^\d{16}$/,
                                            message: "卡號格式錯誤",
                                        },
                                    })}
                                />
                                {errors.cardNum && (
                                    <div className="invalid-feedback">
                                        {errors.cardNum.message}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardExp" className="form-label">
                                    有效期限
                                </label>
                                <input
                                    id="cardExp"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="4"
                                    className={`form-control ${
                                        errors.cardExp ? "is-invalid" : ""
                                    }`}
                                    placeholder="0000"
                                    {...register("cardExp", {
                                        required: {
                                            value: true,
                                            message: "期限為必填",
                                        },
                                        pattern: {
                                            value: /^(0[1-9]|1[0-2])\d{2}$/,
                                            message: "期限格式錯誤",
                                        },
                                    })}
                                />
                                {errors.cardExp && (
                                    <div className="invalid-feedback">
                                        {errors.cardExp.message}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardCvc" className="form-label">
                                    背面末三碼
                                </label>
                                <input
                                    id="cardCvc"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="3"
                                    className={`form-control ${
                                        errors.cardCvc ? "is-invalid" : ""
                                    }`}
                                    placeholder="123"
                                    {...register("cardCvc", {
                                        required: {
                                            value: true,
                                            message: "卡片末三碼必填",
                                        },
                                        pattern: {
                                            value: /^\d{3}$/,
                                            message: "末三碼格式錯誤",
                                        },
                                    })}
                                />
                                {errors.cardCvc && (
                                    <div className="invalid-feedback">
                                        {errors.cardCvc.message}
                                    </div>
                                )}
                            </div>
                            <div className="d-flex flex-column flex-sm-row mt-4 justify-content-between align-items-center w-100 gap-3">
                                <button
                                    type="button"
                                    className="btn text-dark mt-md-0 mt-3"
                                    onClick={handleGoBack}
                                >
                                    <i className="fas fa-chevron-left me-2"></i>
                                    上一步
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-dark py-3 px-7"
                                >
                                    確認付款
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {isScreenLoading && <ScreenLoading />}
        </div>
    );
}

export default CheckoutPayment;
