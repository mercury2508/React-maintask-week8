import PropTypes from "prop-types";
import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function DeleteOrderModal({
  deleteModalState,
  isDeleteOrderModalOpen,
  setIsDeleteOrderModalOpen,
  tempOrder,
  getOrders,
  pageInfo,
}) {
  // 刪除modal
  const deleteOrderModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  useEffect(() => {
    deleteModalRef.current = new Modal(deleteOrderModalRef.current, {
      backdrop: false,
    });
  }, []);

  // 控制刪除modal開關
  useEffect(() => {
    if (isDeleteOrderModalOpen) {
      deleteModalRef.current.show();
    }
  }, [isDeleteOrderModalOpen]);

  // 關閉刪除modal
  const closeDeleteModal = () => {
    deleteModalRef.current.hide();
    setIsDeleteOrderModalOpen(false);
  };

  // 按鈕disabled狀態
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // 刪除單一產品
  const deleteOrder = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${baseUrl}/api/${apiPath}/admin/order/${tempOrder.id}`
      );
      closeDeleteModal();
      getOrders(pageInfo.current_page);
      dispatch(
        pushMessage({
          text: "訂單已刪除",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        pushMessage({
          text: `訂單刪除失敗:${error.message}`,
          status: "failed",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 刪除單一產品
  const deleteAllOrder = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${baseUrl}/api/${apiPath}/admin/orders/all`);
      closeDeleteModal();
      getOrders(pageInfo.current_page);
      dispatch(
        pushMessage({
          text: "已刪除所有訂單",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        pushMessage({
          text: `所有訂單刪除失敗:${error.message}`,
          status: "failed",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 使用modalState狀態判斷該送出刪除單一訂單or所有訂單
  const handleDeleteOrder = async () => {
    const apiCall =
      deleteModalState === "deleteSingle" ? deleteOrder : deleteAllOrder;
    try {
      await apiCall();
      getOrders(pageInfo.current_page);
    } catch (error) {
      dispatch(
        pushMessage({
          text: `刪除訂單功能錯誤:${error.message}`,
          status: "failed",
        })
      );
    } finally {
      setIsDeleteOrderModalOpen(false);
    }
  };

  return (
    <div
      ref={deleteOrderModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除訂單</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeDeleteModal}
            ></button>
          </div>
          <div className="modal-body">
            {deleteModalState === "deleteSingle"
              ? "你是否要刪除訂單編號:"
              : "您確定要刪除所有訂單嗎?"}
            <span className="text-danger fw-bold">{tempOrder.id || ""}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeDeleteModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteOrder}
              disabled={isLoading}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrderModal;

DeleteOrderModal.propTypes = {
  deleteModalState: PropTypes.string,
  isDeleteOrderModalOpen: PropTypes.bool,
  setIsDeleteOrderModalOpen: PropTypes.func,
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
