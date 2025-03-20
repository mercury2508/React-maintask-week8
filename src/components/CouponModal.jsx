import PropTypes from "prop-types";
import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function CouponModal({
  isCouponModalOpen,
  setIsCouponModalOpen,
  couponModalState,
  tempCoupon,
  getCoupons,
  pageInfo,
}) {
  // 新增.編輯產品modal 渲染後才能取得DOM
  const couponModalRef = useRef(null);
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current = new Modal(couponModalRef.current, {
      backdrop: false,
    });
  }, []);

  // 控制產品modal開關
  useEffect(() => {
    if (isCouponModalOpen) {
      modalRef.current.show();
    }
  }, [isCouponModalOpen]);

  // 關閉modal
  const closeModal = () => {
    modalRef.current.hide();
    setIsCouponModalOpen(false);
  };

  // 產品資料狀態
  const [modalData, setModalData] = useState(tempCoupon);

  useEffect(() => {
    setModalData({
      ...tempCoupon,
    });
  }, [tempCoupon]);

  // 撰寫產品modal (需確認name的type是否為checkbox)
  const handleCouponContent = (e) => {
    const { name, value, checked, type } = e.target;

    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // 新增產品
  const addNewCoupon = async () => {
    const couponData = {
      data: {
        ...modalData,
        is_enabled: modalData.is_enabled ? 1 : 0,
        percent: Number(modalData.percent),
        due_date: Math.floor(new Date(modalData.due_date).getTime() / 1000),
      },
    };

    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}/api/${apiPath}/admin/coupon`, couponData);
      setModalData({ ...tempCoupon });
      closeModal();
      dispatch(
        pushMessage({
          text: "已新增優惠券",
          status: "success",
        })
      );
    } catch (error) {
      const errorMsg = error.response.data.message;
      dispatch(
        pushMessage({
          text: `優惠券新增失敗: ${errorMsg}`,
          status: "failed",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 編輯優惠券
  const adjustCoupon = async () => {
    let couponData = {
      data: {
        ...modalData,
        is_enabled: modalData.is_enabled ? 1 : 0,
        percent: Number(modalData.percent),
      },
    };

    // 判斷due_date若是字串則轉為時間戳格式
    if (typeof modalData.due_date === "string") {
      couponData = {
        data: {
          ...modalData,
          due_date: Math.floor(new Date(modalData.due_date).getTime() / 1000),
        },
      };
    }

    setIsLoading(true);
    try {
      const res = await axios.put(
        `${baseUrl}/api/${apiPath}/admin/coupon/${modalData.id}`,
        couponData
      );
      closeModal();
      dispatch(
        pushMessage({
          text: res.data.message,
          status: "success",
        })
      );
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

  // 送出新增產品
  // 使用couponModalState狀態判斷該送出新增or編輯HTTP請求
  const handleUpdateProduct = async () => {
    const apiCall = couponModalState === "add" ? addNewCoupon : adjustCoupon;
    try {
      await apiCall();
      setIsCouponModalOpen(false);
      getCoupons(pageInfo.current_page);
    } catch (error) {
      alert(error);
    }
  };

  // 轉換時間戳記
  const formatDate = (timestamp) => {
    // 判斷時間戳記是否存在
    if (!timestamp) {
      return "";
    } else if (isNaN(Number(timestamp))) {
      //若時間戳記為字串則直接回傳字串
      return timestamp;
    }
    return new Date(timestamp * 1000).toISOString().split("T")[0]; //如果時間戳記存在且不為字串，則處理為字串 YYYY/MM/DD 並回傳
  };

  return (
    <>
      <div
        ref={couponModalRef}
        id="productModal"
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">
                {couponModalState === "add" ? "新增優惠券" : "編輯優惠券"}
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
                <div className="col-md">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      優惠券名稱
                    </label>
                    <input
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入名稱"
                      value={modalData.title}
                      onChange={handleCouponContent}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="percent" className="form-label">
                      折扣額度%
                    </label>
                    <input
                      name="percent"
                      id="percent"
                      type="number"
                      className="form-control"
                      placeholder="請輸入折扣額度 0%~100%"
                      min="0"
                      max="100"
                      value={modalData.percent}
                      onChange={handleCouponContent}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="code" className="form-label">
                      優惠券代碼
                    </label>
                    <input
                      name="code"
                      id="code"
                      type="text"
                      className="form-control"
                      placeholder="請輸入代碼"
                      value={modalData.code}
                      onChange={handleCouponContent}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="due_date" className="form-label">
                      優惠期限
                    </label>
                    <input
                      name="due_date"
                      id="due_date"
                      type="date"
                      className="form-control"
                      value={
                        modalData.due_date ? formatDate(modalData.due_date) : ""
                      }
                      onChange={handleCouponContent}
                    />
                  </div>
                  <div className="form-check">
                    <input
                      name="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                      checked={modalData.is_enabled}
                      onChange={handleCouponContent}
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      是否啟用
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
                onClick={handleUpdateProduct}
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

export default CouponModal;

CouponModal.propTypes = {
  isCouponModalOpen: PropTypes.bool,
  setIsCouponModalOpen: PropTypes.func,
  couponModalState: PropTypes.string,
  tempCoupon: PropTypes.shape({
    title: PropTypes.string,
    is_enabled: PropTypes.number,
    percent: PropTypes.number,
    due_date: PropTypes.number,
    code: PropTypes.string,
  }),
  getCoupons: PropTypes.func,
  pageInfo: PropTypes.shape({
    category: PropTypes.string,
    current_page: PropTypes.number,
    has_next: PropTypes.bool,
    has_pre: PropTypes.bool,
    total_pages: PropTypes.number,
  }),
};
