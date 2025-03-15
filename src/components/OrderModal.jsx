// import PropTypes from "prop-types";
import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function OrderModal({
    isOrderModalOpen, //modal狀態
    setIsOrderModalOpen, //設定modal狀態
    tempOrder,
    getOrders, //取得產品->要改為取得訂單
    pageInfo, //頁面資料
}) {
    // 新增編輯產品modal 渲染後才能取得DOM
    const orderModalRef = useRef(null);
    const modalRef = useRef(null);
    useEffect(() => {
        modalRef.current = new Modal(orderModalRef.current, {
            backdrop: false,
        });
    }, []);

    // 控制產品modal開關
    useEffect(() => {
        if (isOrderModalOpen) {
            modalRef.current.show();
        }
    }, [isOrderModalOpen]);

    // 關閉modal
    const closeModal = () => {
        modalRef.current.hide();
        setIsOrderModalOpen(false);
    };

    // 訂單資料狀態
    const [modalData, setModalData] = useState(tempOrder);

    useEffect(() => {
        setModalData({
            ...tempOrder,
        });
    }, [tempOrder]);

    // 撰寫產品modal (需確認name的type是否為checkbox)
    const handleProductContent = (e) => {
        const { name, value, checked, type } = e.target;
        setModalData({
            ...modalData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // 調整用戶資料
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        const newUser = { ...modalData.user };
        newUser[name] = value;
        setModalData({
            ...modalData,
            user: newUser,
        });
    };

    // 調整備註
    const handleMessageChange = (e) => {
        const { value } = e.target;

        setModalData({
            ...modalData,
            message: value,
        });
    };

    // 調整行程人數
    const updateMemberNum = (itemPrice, cart_id, qty) => {
        const newMemberNum = {
            ...modalData.products,
        };

        newMemberNum[cart_id].qty = qty;
        newMemberNum[cart_id].final_total = qty * itemPrice;
        newMemberNum[cart_id].total = qty * itemPrice;

        setModalData({
            ...modalData,
            products: newMemberNum,
        });
    };

    // 編輯產品
    const adjustOrder = async () => {
        const { message } = modalData;
        const allOrder = {
            ...modalData,
        };

        const arr = Object.values(allOrder.products);

        let totalAmount = 0;
        arr.forEach((item) => {
            totalAmount += item.final_total;
        });

        const orderData = {
            data: {
                ...modalData,
                message: message || "",
                total: totalAmount,
            },
        };

        setIsLoading(true);
        try {
            const res = await axios.put(
                `${baseUrl}/api/${apiPath}/admin/order/${modalData.id}`,
                orderData
            );
            closeModal();
            dispatch(
                pushMessage({
                    text: res.data.message,
                    status: "success",
                })
            );
            setIsOrderModalOpen(false);
            getOrders(pageInfo.current_page);
        } catch (error) {
            dispatch(
                pushMessage({
                    text: error.message,
                    status: "failed",
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    // 刪除訂單上單一產品
    const deleteOrderItem = async (order_id) => {
        // 刪除指定的產品
        const allOrder = {
            ...modalData,
        };
        const { [order_id]: _, ...newProducts } = allOrder.products;

        // 更新訂單總金額
        const arr = Object.values(newProducts);
        let totalAmount = 0;
        arr.forEach((item) => {
            totalAmount += item.final_total;
        });

        setIsLoading(true);
        try {
            const orderData = {
                data: {
                    ...modalData,
                    products: newProducts,
                    total: Number(totalAmount),
                },
            };
            const res = await axios.put(
                `${baseUrl}/api/${apiPath}/admin/order/${modalData.id}`,
                orderData
            );
            dispatch(
                pushMessage({
                    text: res.data.message,
                    status: "success",
                })
            );
            setIsOrderModalOpen(false);
            getOrders(pageInfo.current_page);
        } catch (error) {
            dispatch(
                pushMessage({
                    text: error.message,
                    status: "failed",
                })
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                ref={orderModalRef}
                id="productModal"
                className="modal"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-bottom">
                            <h5 className="modal-title fs-4">編輯訂單</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="row g-4">
                                <div className="col-md">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="username"
                                                    className="form-label"
                                                >
                                                    客戶姓名
                                                </label>
                                                <input
                                                    name="name"
                                                    id="username"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="客戶姓名"
                                                    value={
                                                        modalData.user.name ||
                                                        ""
                                                    }
                                                    onChange={handleUserChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="engName"
                                                    className="form-label"
                                                >
                                                    護照姓名
                                                </label>
                                                <input
                                                    name="engName"
                                                    id="engName"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="護照姓名"
                                                    value={
                                                        modalData.user
                                                            .engName || ""
                                                    }
                                                    onChange={handleUserChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            placeholder="請輸入Email"
                                            value={modalData.user.email || ""}
                                            onChange={handleUserChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="tel"
                                            className="form-label"
                                        >
                                            手機
                                        </label>
                                        <input
                                            name="tel"
                                            id="tel"
                                            type="tel"
                                            className="form-control"
                                            placeholder="手機"
                                            value={modalData.user.tel || ""}
                                            onChange={handleUserChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="address"
                                            className="form-label"
                                        >
                                            帳單地址
                                        </label>
                                        <input
                                            name="address"
                                            id="address"
                                            type="text"
                                            className="form-control"
                                            placeholder="帳單地址"
                                            value={modalData.user.address || ""}
                                            onChange={handleUserChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="message"
                                            className="form-label"
                                        >
                                            其他備註
                                        </label>
                                        {/* <input
                                            name="message"
                                            id="message"
                                            type="text"
                                            className="form-control"
                                            placeholder="帳單地址"
                                            value={modalData.user.address || ""}
                                            onChange={handleUserChange}
                                        /> */}
                                        <textarea
                                            id="message"
                                            className="form-control"
                                            rows="3"
                                            name="message"
                                            placeholder="如有其他需求請備註"
                                            value={modalData.message || ""}
                                            onChange={handleMessageChange}
                                        ></textarea>
                                    </div>

                                    {/* <div className="row g-3 mb-3">
                                        <div className="col-6">
                                            <label
                                                htmlFor="origin_price"
                                                className="form-label"
                                            >
                                                原價
                                            </label>
                                            <input
                                                name="origin_price"
                                                id="origin_price"
                                                type="number"
                                                className="form-control"
                                                placeholder="請輸入原價"
                                                min="0"
                                                value={modalData.origin_price}
                                                onChange={handleProductContent}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label
                                                htmlFor="price"
                                                className="form-label"
                                            >
                                                售價
                                            </label>
                                            <input
                                                name="price"
                                                id="price"
                                                type="number"
                                                className="form-control"
                                                placeholder="請輸入售價"
                                                min="0"
                                                value={modalData.price}
                                                onChange={handleProductContent}
                                            />
                                        </div>
                                    </div> */}
                                    {/*熱門程度*/}
                                    {/* <div className="mb-3">
                                        <label
                                            htmlFor="popularity"
                                            className="form-label"
                                        >
                                            熱門程度
                                        </label>
                                        <input
                                            name="popularity"
                                            id="popularity"
                                            type="number"
                                            className="form-control"
                                            placeholder="請輸入熱門程度"
                                            max="5"
                                            min="1"
                                            value={modalData.popularity}
                                            onChange={handleProductContent}
                                        />
                                    </div> */}
                                    {/*熱門程度*/}
                                    {/* <div className="mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label"
                                        >
                                            產品描述
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            className="form-control"
                                            rows={4}
                                            placeholder="請輸入產品描述"
                                            value={modalData.description}
                                            onChange={handleProductContent}
                                        ></textarea>
                                    </div> */}

                                    {/* <div className="mb-3">
                                        <label
                                            htmlFor="content"
                                            className="form-label"
                                        >
                                            說明內容
                                        </label>
                                        <textarea
                                            name="content"
                                            id="content"
                                            className="form-control"
                                            rows={4}
                                            placeholder="請輸入說明內容"
                                            value={modalData.content}
                                            onChange={handleProductContent}
                                        ></textarea>
                                    </div> */}

                                    {/* <div className="form-check">
                                        <input
                                            name="is_enabled"
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isEnabled"
                                            checked={modalData.is_enabled}
                                            onChange={handleProductContent}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="isEnabled"
                                        >
                                            是否啟用
                                        </label>
                                    </div> */}

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="border-0 ps-3"
                                                >
                                                    行程
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="border-0 ps-6"
                                                >
                                                    同行人數
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="border-0"
                                                >
                                                    價格
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="border-0"
                                                >
                                                    刪除單筆
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(
                                                modalData.products
                                            ).map((item) => (
                                                <tr
                                                    className="border-bottom border-top"
                                                    key={item.id}
                                                >
                                                    <th
                                                        scope="row"
                                                        className="border-0 px-0 font-weight-normal py-4"
                                                    >
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
                                                        <div className="input-group pe-5">
                                                            <div className="input-group-prepend">
                                                                <button
                                                                    className="btn btn-outline-dark border-0 py-2"
                                                                    type="button"
                                                                    id="button-addon1"
                                                                    onClick={() =>
                                                                        updateMemberNum(
                                                                            item
                                                                                .product
                                                                                .price,
                                                                            item.id,
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
                                                                        updateMemberNum(
                                                                            item
                                                                                .product
                                                                                .price,
                                                                            item.id,
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
                                                            // style={{
                                                            //     textAlign:
                                                            //         "center",
                                                            // }}
                                                        >
                                                            {item?.total?.toLocaleString()}
                                                        </p>
                                                    </td>
                                                    <td className="border-0 align-middle">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm ms-2"
                                                            id="button-addon2"
                                                            disabled={
                                                                Object.values(
                                                                    modalData.products
                                                                ).length === 1
                                                            }
                                                            onClick={() =>
                                                                deleteOrderItem(
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
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer border-top bg-light">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={closeModal}
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={adjustOrder}
                                disabled={isLoading}
                            >
                                確認
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderModal;

// OrderModal.propTypes = {
//     isOrderModalOpen: PropTypes.bool,
//     setIsOrderModalOpen: PropTypes.func,
//     modalState: PropTypes.string,
//     tempOrder: PropTypes.shape({
//         imageUrl: PropTypes.string,
//         title: PropTypes.string,
//         category: PropTypes.string,
//         unit: PropTypes.string,
//         origin_price: PropTypes.number,
//         price: PropTypes.number,
//         description: PropTypes.string,
//         content: PropTypes.string,
//         is_enabled: PropTypes.number,
//         popularity: PropTypes.string,
//         imagesUrl: PropTypes.arrayOf(PropTypes.string),
//     }),
//     getOrders: PropTypes.func,
//     pageInfo: PropTypes.shape({
//         category: PropTypes.string,
//         current_page: PropTypes.number,
//         has_next: PropTypes.bool,
//         has_pre: PropTypes.bool,
//         total_pages: PropTypes.number,
//     }),
// };
