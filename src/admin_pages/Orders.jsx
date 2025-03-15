import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
// import ProductModal from "../components/ProductModal";
import DeleteOrderModal from "../components/DeleteOrderModal";

import { LoadingContext } from "../LoadingContext";
import { useNavigate } from "react-router";
import OrderModal from "../components/OrderModal";
// import ScreenLoading from "../components/ScreenLoading";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

// 修改訂單的資料格式
// 戳指定order_id get的資料
const defaultModalData = {
    create_at: 0, //訂單成立時間
    id: "",
    is_paid: false, //付款狀態
    message: "", //留言
    paid_date: 0, //付款時間
    products: {}, //產品資訊
    total: 0,
    user: {}, //客戶資料
    num: 0,
};

function Orders() {
    // 全畫面loading狀態
    //   const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);

    const navigate = useNavigate();

    // 預設取得產品
    useEffect(() => {
        const token = document.cookie.replace(
            // eslint-disable-next-line no-useless-escape
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        if (!token) {
            navigate("/login");
        }
        axios.defaults.headers.common["Authorization"] = token;
        // checkUserLogin();
        getOrders();
    }, []);

    // 確認使用者是否已登入
    //   const checkUserLogin = async () => {
    //     setIsScreenLoading(true);
    //     try {
    //       const res = await axios.post(`${baseUrl}/api/user/check`);
    //       if (!res.data?.success) {
    //         alert(res.data?.message);
    //       } else {
    //         getProducts();
    //       }
    //     } catch (error) {
    //       alert(error.response.data.message);
    //     } finally {
    //       setIsScreenLoading(false);
    //     }
    //   };

    // 取得訂單列表
    const getOrders = async (page = 1) => {
        // setIsScreenLoading(true);
        try {
            const res = await axios.get(
                `${baseUrl}/api/${apiPath}/admin/orders?page=${page}`
            );
            console.log("getOrders", res.data.orders);
            setOrderList(res.data.orders);
            setPageInfo(res.data.pagination);
            // console.log("所有訂單資料:", res.data.orders);
            // console.log("訂單pagination資料", res.data.pagination);
        } catch (error) {
            //   alert(error.response.data.message);
            console.log("getOrders", error.response.data.message);
        }
        // finally {
        //   setIsScreenLoading(false);
        // }
    };

    // 時間格式化
    const formatTime = (timeStamp) => {
        const time = new Date(timeStamp * 1000);

        return `${time.getFullYear()}年${
            time.getMonth() + 1
        }月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    };

    // // 取得指定訂單
    // const getSpecifiedOrder = async (order_id) => {
    //     try {
    //         const res = await axios.get(
    //             `${baseUrl}/api/${apiPath}/order/${order_id}`
    //         );
    //         console.log("取得指定order id的res:", res.data.order);
    //         console.log(
    //             "指定order id的products",
    //             Object.values(res.data.order.products)
    //         ); //這邊變成陣列包物件了 [{}, {}]
    //         // 刪除:將不需要的物件用指定index的方式排掉，接著轉回物件包物件的格式
    //         // 更改產品數量:

    //         // localStorage.setItem(
    //         //     "specifiedOrder",
    //         //     JSON.stringify(res.data.order)
    //         // );
    //     } catch (error) {
    //         // showSwalError(
    //         //     "getSpecifiedOrder失敗",
    //         //     error.response?.data?.message
    //         // );
    //         console.log("sendOrder的error:", error);
    //     }
    // };

    // 調整訂單
    // const adjustOrder = async (order_id) => {
    //     try {
    //         const res = await axios.put(
    //             `${baseUrl}/api/${apiPath}/admin/order/${order_id}`,
    //             data
    //         );
    //         console.log("adjustOrder的res", res);
    //     } catch (error) {
    //         console.log("adjustOrder", error);
    //     }
    // };

    // 訂單列表狀態
    const [orderList, setOrderList] = useState([]);

    // 頁面狀態
    const [pageInfo, setPageInfo] = useState({});

    // 訂單資料modal狀態
    const [tempOrder, setTempOrder] = useState(defaultModalData);

    // 控制開關OrderModal
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    // 控制開關DeleteOrderModal
    const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false);

    // 開啟訂單modal
    const openModal = (product) => {
        setTempOrder(product);
        setIsOrderModalOpen(true);
    };

    // 開啟刪除modal
    const openDeleteModal = (product) => {
        setTempOrder(product);
        setIsDeleteOrderModalOpen(true);
    };

    // 排序state
    // const [sortState, setSortState] = useState("");

    // 依售價排序功能
    // const handleSortByPrice = (e) => {
    //     setSortState(e.target.value);
    //     if (sortState === "high") {
    //         const sorted = [...products];
    //         setProducts(sorted.sort((a, b) => a.price - b.price));
    //     } else if (sortState === "low") {
    //         const sorted = [...products];
    //         setProducts(sorted.sort((a, b) => b.price - a.price));
    //     } else {
    //         getProducts();
    //     }
    // };

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-between mb-3">
                            <h2>訂單管理</h2>
                        </div>
                        {/* <div className="mb-3 d-flex">
              <select
                name="sortPrice"
                id=""
                value={sortState}
                onChange={(e) => handleSortByPrice(e)}
              >
                <option value="" disabled>
                  -- 請選擇排序 --
                </option>
                <option value="high">售價高至低</option>
                <option value="low">售價低至高</option>
              </select>
            </div> */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">訂單號碼</th>
                                    <th scope="col">客戶姓名</th>
                                    <th scope="col">訂單成立時間</th>
                                    <th scope="col">訂單總金額</th>
                                    <th scope="col">付款狀態</th>
                                    <th scope="col">訂單詳情</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((order) => (
                                    <tr key={order.id}>
                                        <th scope="row">{order.id}</th>
                                        <td>{order.user.name}</td>
                                        <td>{formatTime(order?.create_at)}</td>
                                        <td>
                                            {order?.total?.toLocaleString()}
                                        </td>
                                        <td>
                                            {order.is_paid ? (
                                                <span
                                                    style={{ color: "green" }}
                                                >
                                                    已付款
                                                </span>
                                            ) : (
                                                "未付款 "
                                            )}
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                      onClick={() => {
                                                        openModal(order);
                                                      }}
                                                >
                                                    編輯
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                      onClick={() => openDeleteModal(order)}
                                                >
                                                    刪除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination getProducts={getOrders} pageInfo={pageInfo} />
            </div>
            <OrderModal
                isOrderModalOpen={isOrderModalOpen}
                setIsOrderModalOpen={setIsOrderModalOpen}
                tempOrder={tempOrder}
                getOrders={getOrders}
                pageInfo={pageInfo}
            />
            <DeleteOrderModal
                isDeleteOrderModalOpen={isDeleteOrderModalOpen}
                setIsDeleteOrderModalOpen={setIsDeleteOrderModalOpen}
                tempOrder={tempOrder}
                getOrders={getOrders}
                pageInfo={pageInfo}
            />
            {/* {isScreenLoading && <ScreenLoading />} */}
        </>
    );
}

export default Orders;
