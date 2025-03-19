import { useCallback, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ScreenLoading from "../components/ScreenLoading";
import { LoadingContext } from "../LoadingContext";
import { Link } from "react-router";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch } from "react-redux";
import { updateCartData } from "../redux/cartSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Cart() {
    const [cartItem, setCartItem] = useState({});
    const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);
    const [products, setProducts] = useState([]);
    const swiperRef = useRef(null);
    const dispatch = useDispatch();

    // 取得購物車內容
    const gettingCartList = useCallback(() => {
        const getCartList = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/${apiPath}/cart`);
                setCartItem(res.data.data);
                dispatch(updateCartData(res.data.data));
            } catch (error) {
                showSwalError("取得購物車失敗", error.response?.data?.message);
            }
        };
        getCartList();
    }, [dispatch]);

    useEffect(() => {
        gettingCartList();

        // 取得產品列表
        const getProducts = async () => {
            setIsScreenLoading(true);
            try {
                const res = await axios.get(
                    `${baseUrl}/api/${apiPath}/products`
                );
                setProducts(res.data.products);
            } catch (error) {
                showSwalError("取得產品失敗", error.response?.data?.message);
            } finally {
                setIsScreenLoading(false);
            }
        };
        getProducts();

        new Swiper(swiperRef.current, {
            modules: [Autoplay, Pagination],
            loop: false,
            speed: 1500,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            slidesPerView: 2,
            spaceBetween: 10,
            breakpoints: {
                767: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }, [gettingCartList, setIsScreenLoading]);

    // sweetalert成功提示
    const showSwal = (text) => {
        withReactContent(Swal).fire({
            title: text,
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
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

    // 調整商品數量
    const updateCartItem = async (cart_id, item_id, qty) => {
        const itemData = {
            data: {
                product_id: item_id,
                qty: Number(qty),
            },
        };
        setIsScreenLoading(true);
        try {
            await axios.put(
                `${baseUrl}/api/${apiPath}/cart/${cart_id}`,
                itemData
            );
            // getCartList();
            gettingCartList();
        } catch (error) {
            showSwalError("調整商品數量失敗", error.response?.data?.message);
        } finally {
            setIsScreenLoading(false);
        }
    };

    // 清空購物車
    const deleteCarts = async () => {
        setIsScreenLoading(true);
        try {
            await axios.delete(`${baseUrl}/api/${apiPath}/carts`);
            // getCartList();
            gettingCartList();
        } catch (error) {
            showSwalError("清空購物車失敗", error.response?.data?.message);
        } finally {
            setIsScreenLoading(false);
        }
    };

    // 刪除購物車單一物品
    const deleteCartItem = async (id) => {
        setIsScreenLoading(true);
        try {
            await axios.delete(`${baseUrl}/api/${apiPath}/cart/${id}`);
            // getCartList();
            gettingCartList();
        } catch (error) {
            showSwalError("刪除購物車商品失敗", error.response?.data?.message);
        } finally {
            setIsScreenLoading(false);
        }
    };

    // 優惠券代號
    const [couponCode, setCouponCode] = useState("");

    // 處理優惠券 避免送出空字串
    const handleCoupon = () => {
        if (couponCode !== "") {
            const couponData = {
                data: {
                    code: couponCode,
                },
            };
            submitCoupon(couponData);
        }
    };

    // 套用優惠券
    const submitCoupon = async (couponData) => {
        try {
            await axios.post(`${baseUrl}/api/${apiPath}/coupon`, couponData);
            showSwal("已套用優惠券");
            // getCartList();
            gettingCartList();
        } catch (error) {
            showSwalError("錯誤", error.response.data.message);
            setCouponCode("");
        }
    };

    return (
        <div className="container-fluid">
            <div className="container">
                <div className="mt-3">
                    <h3 className="mt-3 mb-4">購物車</h3>
                    {cartItem.carts?.length > 0 ? (
                        <div className="row">
                            <div className="col-md-8">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-0 ps-0"
                                            >
                                                行程
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            >
                                                同行人數
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                                style={{ textAlign: "center" }}
                                            >
                                                價格
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItem.carts?.map((item) => (
                                            <tr
                                                className="border-bottom border-top"
                                                key={item.id}
                                            >
                                                <th
                                                    scope="row"
                                                    className="border-0 px-0 font-weight-normal py-4"
                                                >
                                                    <img
                                                        src={
                                                            item.product
                                                                .imageUrl
                                                        }
                                                        alt={item.title}
                                                        style={{
                                                            width: "72px",
                                                            height: "72px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <p className="mb-0 fw-bold ms-3 d-inline-block">
                                                        {item.product.title}
                                                    </p>
                                                </th>
                                                <td
                                                    className="border-0 align-middle"
                                                    style={{
                                                        maxWidth: "160px",
                                                    }}
                                                >
                                                    <div className="input-group pe-5 pe-5 d-flex flex-column flex-sm-row align-items-center justify-content-center">
                                                        <div className="input-group-prepend">
                                                            <button
                                                                className="btn btn-outline-dark border-0 py-2"
                                                                type="button"
                                                                id="button-addon1"
                                                                onClick={() =>
                                                                    updateCartItem(
                                                                        item.id,
                                                                        item.product_id,
                                                                        item.qty -
                                                                            1
                                                                    )
                                                                }
                                                                disabled={
                                                                    item.qty ===
                                                                    1
                                                                }
                                                            >
                                                                <i className="fas fa-minus"></i>
                                                            </button>
                                                        </div>

                                                        <span
                                                            className="btn border-0 text-center my-auto shadow-none"
                                                            style={{
                                                                width: "100px",
                                                                cursor: "auto",
                                                            }}
                                                        >
                                                            {item.qty}
                                                        </span>

                                                        <div className="input-group-append">
                                                            <button
                                                                className="btn btn-outline-dark border-0 py-2"
                                                                type="button"
                                                                id="button-addon2"
                                                                onClick={() =>
                                                                    updateCartItem(
                                                                        item.id,
                                                                        item.product_id,
                                                                        item.qty +
                                                                            1
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-0 align-middle">
                                                    <p
                                                        className="mb-0 ms-auto"
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {item?.total?.toLocaleString()}
                                                    </p>
                                                </td>
                                                <td className="border-0 align-middle">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm"
                                                        id="button-addon2"
                                                        onClick={() =>
                                                            deleteCartItem(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        刪除
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="text-top py-3 col-6">
                                        <button
                                            className="btn btn-outline-danger"
                                            type="button"
                                            onClick={deleteCarts}
                                            disabled={!cartItem.carts?.length}
                                        >
                                            清空購物車
                                        </button>
                                    </div>
                                    <div className="input-group w-50 mb-3 col-6">
                                        <input
                                            type="text"
                                            className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                                            placeholder="請輸入優惠券"
                                            aria-label="Recipient's username"
                                            aria-describedby="button-addon2"
                                            value={couponCode}
                                            onChange={(e) =>
                                                setCouponCode(e.target.value)
                                            }
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                                            id="button-addon2"
                                            onClick={() => handleCoupon()}
                                        >
                                            <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="border p-4 mb-4">
                                    <h4 className="fw-bold mb-4">訂單明細</h4>
                                    <table className="table text-muted border-bottom">
                                        <tbody>
                                            <tr>
                                                <th
                                                    scope="row"
                                                    className="border-0 px-0 pt-4 font-weight-normal"
                                                >
                                                    金額小計
                                                </th>
                                                <td className="text-end border-0 px-0 pt-4">
                                                    NT$
                                                    {cartItem?.total?.toLocaleString()}
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
                                            NT$
                                            {cartItem?.final_total?.toLocaleString()}
                                        </p>
                                    </div>
                                    <Link
                                        to="/checkout-form"
                                        className="btn btn-dark w-100 mt-4"
                                    >
                                        前往結帳
                                    </Link>
                                    <hr />
                                    <div className="mt-3">
                                        <h5 className="mt-3 h4 fw-bold fs-5">
                                            注意事項:
                                        </h5>
                                        <ul>
                                            <li>
                                                下單前請再次仔細核對人數與行程內容，確保同行人數是否一致。
                                            </li>
                                            <li>
                                                本產品為旅遊套票行程，其中部分行程須提前預訂，因此所有套票行程均需全額付款以確保您的預約權益。
                                            </li>
                                            <li>
                                                付款方式僅限信用卡支付，恕不接受現金、匯款或其他付款方式，敬請見諒。
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-3 mb-3">
                            <h5>您的購物車目前是空的</h5>
                        </div>
                    )}
                    <div className="my-5">
                        <h3 className="fw-bold">逛逛其他行程</h3>
                        <div className="swiper mt-4 mb-5" ref={swiperRef}>
                            <div className="swiper-wrapper mb-3">
                                {products.map((product) => (
                                    <div
                                        className="swiper-slide"
                                        key={product.id}
                                    >
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="d-block text-decoration-none"
                                        >
                                            <div className="card border-0 mb-4 position-relative">
                                                <img
                                                    src={product.imageUrl}
                                                    className="card-img-top rounded-0 object-fit-cover"
                                                    alt={product.title}
                                                    height="200"
                                                />
                                                <div className="card-body p-0">
                                                    <h4 className="mb-0 mt-3">
                                                        {product.title}
                                                    </h4>
                                                    <p className="card-text mb-0">
                                                        {/* <span className="text-muted ">
                                                            <del className="me-2">
                                                                NT$
                                                                {product?.origin_price?.toLocaleString()}
                                                            </del>
                                                        </span> */}
                                                        NT$
                                                        {product?.price?.toLocaleString()}
                                                    </p>
                                                    {/* <p className="text-muted mt-3">??</p> */}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="swiper-pagination"></div>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </div>
                    </div>
                </div>
            </div>
            {isScreenLoading && <ScreenLoading />}
        </div>
    );
}

export default Cart;
