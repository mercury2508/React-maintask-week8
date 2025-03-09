import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LoadingContext } from "../LoadingContext";
import ScreenLoading from "../components/ScreenLoading";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function CheckoutForm() {
    const [cartItem, setCartItem] = useState({});
    const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);
    const navigate = useNavigate();

    // 表單驗證
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    useEffect(() => {
        getCartList();
        const savedOrderData = localStorage.getItem("submitData");
        if (savedOrderData) {
            const parsedData = JSON.parse(savedOrderData);
            if (parsedData.data && parsedData.data.user) {
                const orderData = parsedData.data.user;
                Object.keys(orderData).forEach((key) => {
                    setValue(key, orderData[key] || "");
                });
                setValue("message", parsedData.data.message);
            }
        }
    }, [setValue]);

    //取得購物車內容
    const getCartList = async () => {
        setIsScreenLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/api/${apiPath}/cart`);
            setCartItem(res.data.data);
            // console.log("cartItem購物車內容:", res.data.data);
        } catch (error) {
            showSwalError("取得購物車失敗", error.response?.data?.message);
        } finally{
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

    // 表單資料
    const onSubmit = handleSubmit((data) => {
        const { message, ...user } = data;
        const submitData = {
            data: {
                user,
                message,
            },
        };
        sendOrder(submitData);
    });

    // 送出訂單test
    const sendOrder = (submitData) => {
        // console.log(submitData);
        localStorage.setItem("submitData", JSON.stringify(submitData));
        navigate(`/checkout-payment`);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <nav className="navbar navbar-expand-lg navbar-light px-0">
                        {/* <a className="navbar-brand" href="">
                            Navbar1
                        </a> */}
                        <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                            <li className="me-md-6 me-3 position-relative custom-step-line">
                                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
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
                    <h3 className="fw-bold mb-4 pt-3">建立訂單</h3>
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
                        {/* <div className="d-flex mt-2">
                            <img
                                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                                alt=""
                                className="me-2"
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="w-100">
                                <div className="d-flex justify-content-between">
                                    <p className="mb-0 fw-bold">Lorem ipsum</p>
                                    <p className="mb-0">NT$12,000</p>
                                </div>
                                <p className="mb-0 fw-bold">x1</p>
                            </div>
                        </div> */}
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
                                        付款方式
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
                                NT${cartItem.final_total?.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <form className="col" action="" onSubmit={onSubmit}>
                        {/* <p>訂購人資訊</p> */}
                        <div className="row mb-3">
                            <div className="col-6">
                                <label
                                    htmlFor="name"
                                    className="text-muted mb-0"
                                >
                                    姓名
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={`form-control ${
                                        errors.name ? "is-invalid" : ""
                                    }`}
                                    placeholder="王小明"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "姓名為必填",
                                        },
                                    })}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>

                            <div className="col-6">
                                <label
                                    htmlFor="tel"
                                    className="text-muted mb-0"
                                >
                                    手機
                                </label>
                                <input
                                    id="tel"
                                    type="tel"
                                    className={`form-control ${
                                        errors.tel ? "is-invalid" : ""
                                    }`}
                                    placeholder="0912345678"
                                    {...register("tel", {
                                        required: {
                                            value: true,
                                            message: "電話為必填",
                                        },
                                        pattern: {
                                            value: /^(0[2-8]\d{7}|09\d{8})$/,
                                            message: "電話格式不正確",
                                        },
                                    })}
                                />
                                {errors.tel && (
                                    <div className="invalid-feedback">
                                        {errors.tel.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="text-muted mb-0">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={`form-control ${
                                    errors.email ? "is-invalid" : ""
                                }`}
                                aria-describedby="emailHelp"
                                placeholder="abc@gmail.com"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email為必填",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Email格式錯誤",
                                    },
                                })}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="engName"
                                className="text-muted mb-0"
                            >
                                護照姓名
                            </label>
                            <input
                                id="engName"
                                type="text"
                                className={`form-control ${
                                    errors.engName ? "is-invalid" : ""
                                }`}
                                placeholder="WANG,XIAO-MING"
                                {...register("engName", {
                                    required: {
                                        value: true,
                                        message: "護照英文姓名為必填",
                                    },
                                })}
                            />
                            {errors.engName && (
                                <div className="invalid-feedback">
                                    {errors.engName.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="address"
                                className="text-muted mb-0"
                            >
                                地址
                            </label>
                            <input
                                id="address"
                                type="text"
                                className={`form-control ${
                                    errors.address ? "is-invalid" : ""
                                }`}
                                aria-describedby="emailHelp"
                                placeholder="請輸入地址"
                                {...register("address", {
                                    required: {
                                        value: true,
                                        message: "地址為必填",
                                    },
                                })}
                            />
                            {errors.address && (
                                <div className="invalid-feedback">
                                    {errors.address.message}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="message"
                                className="text-muted mb-0"
                            >
                                其他備註
                            </label>
                            <textarea
                                id="message"
                                className="form-control"
                                rows="3"
                                placeholder="如有其他需求請備註"
                                {...register("message")}
                            ></textarea>
                        </div>
                        <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                            <Link to="/cart" className="text-dark mt-md-0 mt-3">
                                <i className="fas fa-chevron-left me-2"></i>{" "}
                                上一步
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-dark py-3 px-7"
                            >
                                填寫結帳資訊
                                <i className="fas fa-chevron-right ms-2"></i>{" "}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isScreenLoading && <ScreenLoading />}
        </div>
    );
}

export default CheckoutForm;
