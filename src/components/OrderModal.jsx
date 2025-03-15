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
        // console.log("modalData:", modalData);
        console.log("tempOrder:", tempOrder);
    }, []);

    // 控制產品modal開關
    useEffect(() => {
        if (isOrderModalOpen) {
            modalRef.current.show();
        }
        console.log("modalData:", modalData);
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

    // 調整副圖
    // const handleImageChange = (e, index) => {
    //     const { value } = e.target;
    //     const newImages = [...modalData.imagesUrl];
    //     newImages[index] = value;
    //     setModalData({
    //         ...modalData,
    //         imagesUrl: newImages,
    //     });
    // };

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

    // 新增附圖button
    // const handleAddImages = () => {
    //     const newImages = [...modalData.imagesUrl];
    //     newImages.push("");
    //     setModalData({
    //         ...modalData,
    //         imagesUrl: newImages,
    //     });
    // };

    //刪除副圖button
    // const handleRemoveImages = () => {
    //     const newImages = [...modalData.imagesUrl];
    //     newImages.pop();
    //     setModalData({
    //         ...modalData,
    //         imagesUrl: newImages,
    //     });
    // };

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // 新增產品
    // const addNewProduct = async () => {
    //     setIsLoading(true);
    //     try {
    //         const productData = {
    //             data: {
    //                 ...modalData,
    //                 origin_price: Number(modalData.origin_price),
    //                 price: Number(modalData.price),
    //                 is_enabled: modalData.is_enabled ? 1 : 0,
    //             },
    //         };
    //         await axios.post(
    //             `${baseUrl}/api/${apiPath}/admin/product`,
    //             productData
    //         );
    //         setModalData({ ...tempOrder });
    //         closeModal();
    //         dispatch(
    //             pushMessage({
    //                 text: "已新增產品",
    //                 status: "success",
    //             })
    //         );
    //     } catch (error) {
    //         const errorMsg = error.response.data.message;
    //         dispatch(
    //             pushMessage({
    //                 text: `產品新增失敗: ${errorMsg}`,
    //                 status: "failed",
    //             })
    //         );
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // 調整用戶資料
    // const handleUserChange = (e) => {
    //     const { name, value } = e.target;
    //     const newUser = { ...modalData.user };
    //     newUser[name] = value;
    //     setModalData({
    //         ...modalData,
    //         user: newUser,
    //     });
    // };

    // 調整行程人數
    // 不知道的ID、product_id、qty
    const updateMemberNum = (itemPrice, cart_id, qty) => {
        // const memberNum = {
        //     id: cart_id,
        //     product_id,
        //     qty, //不需要轉為數字型別?
        // };
        const newMemberNum = {
            ...modalData.products,
        };

        console.log("products:", newMemberNum);
        newMemberNum[cart_id].qty = qty;
        newMemberNum[cart_id].final_total = qty * itemPrice;
        newMemberNum[cart_id].total = qty * itemPrice;

        console.log(newMemberNum);
        setModalData({
            ...modalData,
            products: newMemberNum,
        });
    };

    // 編輯產品
    const adjustOrder = async() => {
        const { create_at, is_paid, message, products, user, num } = modalData;
        // console.log("modalData", modalData);
        const arr = Object.values(modalData.products);

        let totalAmout = 0;
        arr.forEach((item)=>{
            totalAmout += item.final_total
        })

        // console.log(totalAmout);
        
        const orderData = {
            data: {
                ...modalData,
                message: message || "",
                total: totalAmout
            },
        };
        
        

        // const orderData = {
        //     data: {
        //         create_at,
        //         is_paid,
        //         message: message || "",
        //         products,
        //         user,
        //         num,
        //     },
        // };

        console.log("orderData", orderData);

        setIsLoading(true);
        try {
            // const orderData = {
            //     data: {
            //         ...modalData,
            //         origin_price: Number(modalData.origin_price),
            //         price: Number(modalData.price),
            //         is_enabled: modalData.is_enabled ? 1 : 0,
            //     },
            // };
            const res = await axios.put(
                `${baseUrl}/api/${apiPath}/admin/order/${modalData.id}`,
                orderData
            );
            // closeModal();
            // dispatch(
            //     pushMessage({
            //         text: res.data.message,
            //         status: "success",
            //     })
            // );
            // setIsOrderModalOpen(false);
            // getOrders(pageInfo.current_page);
            console.log(res);
            
        } catch (error) {
            // dispatch(
            //     pushMessage({
            //         text: error.message,
            //         status: "failed",
            //     })
            // );
            console.log(error);
            
        } finally {
            setIsLoading(false);
        }
    };

    // 送出新增產品
    // 使用modalState狀態判斷該送出新增or編輯HTTP請求
    // const handleUpdateProduct = async () => {
    //     const apiCall = modalState === "add" ? addNewProduct : adjustProduct;
    //     try {
    //         await apiCall();
    //         setIsOrderModalOpen(false);
    //         getOrders(pageInfo.current_page);
    //     } catch (error) {
    //         alert(error);
    //     }
    // };

    // 圖片上傳
    // const handleUploadImage = async (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append("file-to-upload", file);
    //     try {
    //         const res = await axios.post(
    //             `${baseUrl}/api/${apiPath}/admin/upload`,
    //             formData
    //         );
    //         const uploadedUrl = res.data.imageUrl;
    //         setModalData({
    //             ...modalData,
    //             imageUrl: uploadedUrl,
    //         });
    //     } catch (error) {
    //         dispatch(
    //             pushMessage({
    //                 text: `圖片上傳失敗:${error.message}`,
    //                 status: "failed",
    //             })
    //         );
    //     }
    // };

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
                            <h5 className="modal-title fs-4">
                                {/* {modalState === "add" ? "新增產品" : "編輯產品"} */}
                                編輯訂單
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="row g-4">
                                {/* <div className="col-md-4">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="fileInput"
                                            className="form-label"
                                        >
                                            {" "}
                                            圖片上傳{" "}
                                        </label>
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="form-control"
                                            id="fileInput"
                                            onChange={handleUploadImage}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="primary-image"
                                            className="form-label"
                                        >
                                            主圖
                                        </label>
                                        <div className="input-group">
                                            <input
                                                name="imageUrl"
                                                type="text"
                                                id="primary-image"
                                                className="form-control"
                                                placeholder="請輸入圖片連結"
                                                value={modalData.imageUrl}
                                                onChange={handleProductContent}
                                            />
                                        </div>
                                        <img
                                            src={modalData.imageUrl}
                                            alt={modalData.title}
                                            className="img-fluid"
                                        />
                                    </div>

                                    <div className="border border-2 border-dashed rounded-3 p-2">
                                        {modalData.imagesUrl?.map(
                                            (image, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-2"
                                                >
                                                    <label
                                                        htmlFor={`imagesUrl-${
                                                            index + 1
                                                        }`}
                                                        className="form-label"
                                                    >
                                                        副圖 {index + 1}
                                                    </label>
                                                    <input
                                                        id={`imagesUrl-${
                                                            index + 1
                                                        }`}
                                                        type="text"
                                                        placeholder={`圖片網址 ${
                                                            index + 1
                                                        }`}
                                                        className="form-control mb-2"
                                                        value={image}
                                                        onChange={(e) =>
                                                            handleImageChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                    />
                                                    {image && (
                                                        <img
                                                            src={image}
                                                            alt={`副圖 ${
                                                                index + 1
                                                            }`}
                                                            className="img-fluid mb-2"
                                                        />
                                                    )}
                                                </div>
                                            )
                                        )}
                                        <div className="btn-group w-100">
                                            {modalData.imagesUrl.length < 5 &&
                                                modalData.imagesUrl[
                                                    modalData.imagesUrl.length -
                                                        1
                                                ] !== "" && (
                                                    <button
                                                        className="btn btn-outline-primary btn-sm w-100"
                                                        onClick={
                                                            handleAddImages
                                                        }
                                                    >
                                                        新增圖片
                                                    </button>
                                                )}
                                            {modalData.imagesUrl.length > 1 && (
                                                <button
                                                    className="btn btn-outline-danger btn-sm w-100"
                                                    onClick={handleRemoveImages}
                                                >
                                                    取消圖片
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div> */}

                                <div className="col-md-8">
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
                                            placeholder="請輸入標題"
                                            value={modalData.user.name || ""}
                                            onChange={handleUserChange}
                                        />
                                    </div>

                                    {/* <div className="mb-3">
                                        <label
                                            htmlFor="category"
                                            className="form-label"
                                        >
                                            分類
                                        </label>
                                        <input
                                            name="category"
                                            id="category"
                                            type="text"
                                            className="form-control"
                                            placeholder="請輸入分類"
                                            value={modalData.category}
                                            onChange={handleProductContent}
                                        />
                                    </div> */}

                                    {/* <div className="mb-3">
                                        <label
                                            htmlFor="unit"
                                            className="form-label"
                                        >
                                            單位
                                        </label>
                                        <input
                                            name="unit"
                                            id="unit"
                                            type="text"
                                            className="form-control"
                                            placeholder="請輸入單位"
                                            value={modalData.unit}
                                            onChange={handleProductContent}
                                        />
                                    </div> */}

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
                                                    className="border-0 ps-1"
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
                                                    style={{
                                                        textAlign: "center",
                                                    }}
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
                                            {Object.values(
                                                modalData.products
                                            ).map((item) => (
                                                <tr
                                                    className="border-bottom border-top"
                                                    key={item.id} //不知道是甚麼的那串id
                                                >
                                                    <th
                                                        scope="row"
                                                        className="border-0 px-0 font-weight-normal py-4"
                                                    >
                                                        {/* <img
                                                            src={
                                                                item.product
                                                                    .imageUrl
                                                            }
                                                            alt={item.title}
                                                            style={{
                                                                width: "72px",
                                                                height: "72px",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                        /> */}
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
                                                    {/* <td className="border-0 align-middle">
                                                        <p
                                                            className="mb-0 ms-auto"
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                            }}
                                                        >
                                                            {item?.total?.toLocaleString()}
                                                        </p>
                                                    </td> */}
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
