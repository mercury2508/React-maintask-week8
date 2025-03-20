import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import DeleteOrderModal from "../components/DeleteOrderModal";

import { LoadingContext } from "../LoadingContext";
import OrderModal from "../components/OrderModal";
import ScreenLoading from "../components/ScreenLoading";

import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

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
  const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();

  // 取得訂單列表
  const gettingOrders = useCallback(
    (page) => {
      const getOrders = async (page = 1) => {
        setIsScreenLoading(true);
        try {
          const res = await axios.get(
            `${baseUrl}/api/${apiPath}/admin/orders?page=${page}`
          );
          setOrderList(res.data.orders);
          setPageInfo(res.data.pagination);
        } catch (error) {
          dispatch(
            pushMessage({
              text: `取得訂單功能失敗:${error.response.data.message}`,
              status: "failed",
            })
          );
        } finally {
          setIsScreenLoading(false);
        }
      };

      getOrders(page);
    },
    [dispatch, setIsScreenLoading]
  );

  useEffect(() => {
    const token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    gettingOrders();
  }, [gettingOrders]);

  // 時間格式化
  const formatTime = (timeStamp) => {
    const time = new Date(timeStamp * 1000);

    return `${time.getFullYear()}年${
      time.getMonth() + 1
    }月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };

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

  // modal狀態為刪除所有or刪除單筆
  const [deleteModalState, setDeleteModalState] = useState(null);

  // 開啟刪除modal
  const openDeleteModal = (mod, product) => {
    setDeleteModalState(mod);
    if (mod === "deleteSingle") {
      setTempOrder(product);
    } else if (mod === "deleteAll") {
      setTempOrder(defaultModalData);
    }
    setIsDeleteOrderModalOpen(true);
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between mb-3">
              <h2>訂單管理</h2>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  openDeleteModal("deleteAll", defaultModalData);
                }}
              >
                刪除所有訂單
              </button>
            </div>
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
                    <td>{order?.total?.toLocaleString()}</td>
                    <td>
                      {order.is_paid ? (
                        <span style={{ color: "green" }}>已付款</span>
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
                          onClick={() => openDeleteModal("deleteSingle", order)}
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
        <Pagination getProducts={gettingOrders} pageInfo={pageInfo} />
      </div>
      <OrderModal
        isOrderModalOpen={isOrderModalOpen}
        setIsOrderModalOpen={setIsOrderModalOpen}
        tempOrder={tempOrder}
        getOrders={gettingOrders}
        pageInfo={pageInfo}
      />
      <DeleteOrderModal
        deleteModalState={deleteModalState} //判斷要做單筆刪除還是所有刪除的狀態
        isDeleteOrderModalOpen={isDeleteOrderModalOpen} //delete modal 狀態
        setIsDeleteOrderModalOpen={setIsDeleteOrderModalOpen} //設定delete modal 狀態
        tempOrder={tempOrder}
        getOrders={gettingOrders}
        pageInfo={pageInfo}
      />
      {isScreenLoading && <ScreenLoading />}
    </>
  );
}

export default Orders;
