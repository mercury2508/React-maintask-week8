import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
// import ProductModal from "../components/ProductModal";
// import DeleteProductModal from "../components/DeleteProductModal";

import { LoadingContext } from "../LoadingContext";
import { useNavigate } from "react-router";
import OrderModal from "../components/OrderModal";
// import ScreenLoading from "../components/ScreenLoading";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

// const defaultModalState = {
//   imageUrl: "",
//   title: "",
//   category: "",
//   unit: "",
//   origin_price: 0,
//   price: 0,
//   description: "",
//   content: "",
//   is_enabled: 0,
//   popularity: "",
//   imagesUrl: [""],
// };

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
      setOrderList(res.data.orders);
      setPageInfo(res.data.pagination);
        console.log("所有訂單資料:", res.data.orders);
        console.log("訂單pagination資料", res.data.pagination);
        
    } catch (error) {
    //   alert(error.response.data.message);
      console.log("getOrders", error.response.data.message);
    } 
    // finally {
    //   setIsScreenLoading(false);
    // }
  };

  // 訂單列表狀態
  const [orderList, setOrderList] = useState([]);

  // 頁面狀態
  const [pageInfo, setPageInfo] = useState({});

//   // modal狀態為新增or編輯
//   const [modalState, setModalState] = useState(null);

//   // 產品modal狀態
//   const [tempProduct, setTempProduct] = useState(defaultModalState);

//   // 控制開關ProductModal
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);

//   // 控制開關DeleteProductModal
//   const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
//     useState(false);

  // 開啟modal，點編輯的話則帶入產品原先內容
//   const openModal = (mod, product) => {
//     setModalState(mod);
//     if (mod === "add") {
//       setTempProduct(defaultModalState);
//     } else if (mod === "edit") {
//       setTempProduct(product);
//     }
//     setIsProductModalOpen(true);
//   };

  // 開啟刪除modal
//   const openDeleteModal = (product) => {
//     setTempProduct(product);
//     setIsDeleteProductModalOpen(true);
//   };

  // 排序state
//   const [sortState, setSortState] = useState("");

  // 依售價排序功能
//   const handleSortByPrice = (e) => {
//     setSortState(e.target.value);
//     if (sortState === "high") {
//       const sorted = [...products];
//       setProducts(sorted.sort((a, b) => a.price - b.price));
//     } else if (sortState === "low") {
//       const sorted = [...products];
//       setProducts(sorted.sort((a, b) => b.price - a.price));
//     } else {
//       getProducts();
//     }
//   };

    // 時間格式化
    const formatTime = (timeStamp) => {
        const time = new Date(timeStamp * 1000);

        return `${time.getFullYear()}年${
            time.getMonth() + 1
        }月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
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
                className="btn btn-primary"
                // onClick={() => {
                //   openModal("add");
                // }}
              >
                新增訂單
              </button>
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
                        //   onClick={() => {
                        //     openModal("edit", order);
                        //   }}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        //   onClick={() => openDeleteModal(order)}
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
      {/* <ProductModal
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        modalState={modalState}
        tempProduct={tempProduct}
        getProducts={getProducts}
        pageInfo={pageInfo}
      /> */}
      <OrderModal
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        modalState={modalState}
        tempProduct={tempProduct}
        getOrders={getOrders}
        pageInfo={pageInfo}
      />
      {/* <DeleteProductModal
        isDeleteProductModalOpen={isDeleteProductModalOpen}
        setIsDeleteProductModalOpen={setIsDeleteProductModalOpen}
        tempProduct={tempProduct}
        getProducts={getOrders}
        pageInfo={pageInfo}
      /> */}
      {/* {isScreenLoading && <ScreenLoading />} */}
    </>
  );
}

export default Orders;
