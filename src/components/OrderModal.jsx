import PropTypes from "prop-types";
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
    getOrders(pageInfo.current_page);
    setIsOrderModalOpen(false);
  };

  // 訂單資料狀態
  const [modalData, setModalData] = useState(tempOrder);

  useEffect(() => {
    setModalData({
      ...tempOrder,
    });
  }, [tempOrder]);

  // 判斷是否已付款
  const handleIsPaid = (e) => {
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

    let totalAmount = 0;
    if (allOrder.products) {
      const arr = Object.values(allOrder.products);
      arr.forEach((item) => {
        totalAmount += item.final_total;
      });
    }

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
  const deleteOrderItem = (order_id) => {
    // 刪除指定的產品
    const allOrder = {
      ...modalData,
    };
    const { [order_id]: _, ...newProducts } = allOrder.products;

    setModalData({
      ...modalData,
      products: newProducts,
    });
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
                        <label htmlFor="username" className="form-label">
                          客戶姓名
                        </label>
                        <input
                          name="name"
                          id="username"
                          type="text"
                          className="form-control"
                          placeholder="客戶姓名"
                          value={modalData.user.name || ""}
                          onChange={handleUserChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="engName" className="form-label">
                          護照姓名
                        </label>
                        <input
                          name="engName"
                          id="engName"
                          type="text"
                          className="form-control"
                          placeholder="護照姓名"
                          value={modalData.user.engName || ""}
                          onChange={handleUserChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
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
                    <label htmlFor="tel" className="form-label">
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
                    <label htmlFor="address" className="form-label">
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
                    <label htmlFor="message" className="form-label">
                      其他備註
                    </label>
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
                  {modalData.products ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 ps-3">
                            行程
                          </th>
                          <th scope="col" className="border-0 ps-6">
                            同行人數
                          </th>
                          <th scope="col" className="border-0">
                            價格
                          </th>
                          <th scope="col" className="border-0">
                            刪除單筆
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {Object.values(modalData.products).map((item) => (
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
                                        item.product.price,
                                        item.id,
                                        item.qty - 1
                                      )
                                    }
                                    disabled={item.qty === 1}
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
                                        item.product.price,
                                        item.id,
                                        item.qty + 1
                                      )
                                    }
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="border-0 align-middle">
                              <p className="mb-0 ms-auto">
                                {item?.total?.toLocaleString()}
                              </p>
                            </td>
                            <td className="border-0 align-middle">
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm ms-2"
                                id="button-addon2"
                                onClick={() => deleteOrderItem(item.id)}
                              >
                                刪除
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>此筆訂單目前沒有任何產品</p>
                  )}

                  <div className="form-check">
                    <input
                      name="is_paid"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                      checked={modalData.is_paid}
                      onChange={handleIsPaid}
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      已付款
                    </label>
                  </div>
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

OrderModal.propTypes = {
  isOrderModalOpen: PropTypes.bool,
  setIsOrderModalOpen: PropTypes.func,
  tempOrder: PropTypes.shape({
    create_at: PropTypes.number,
    id: PropTypes.string,
    is_paid: PropTypes.bool,
    message: PropTypes.string,
    paid_date: PropTypes.number,
    products: PropTypes.object,
    total: PropTypes.number,
    user: PropTypes.object,
    num: PropTypes.number,
  }),
  getOrders: PropTypes.func,
  pageInfo: PropTypes.shape({
    category: PropTypes.string,
    current_page: PropTypes.number,
    has_next: PropTypes.bool,
    has_pre: PropTypes.bool,
    total_pages: PropTypes.number,
  }),
};
