import PropTypes from "prop-types";
import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function DeleteCouponModal({
    isDeleteCouponModalOpen,
    setIsDeleteCouponModalOpen,
    tempCoupon,
    getCoupons,
    pageInfo,
}) {
    // 刪除modal
    const deleteCouponModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    useEffect(() => {
        deleteModalRef.current = new Modal(deleteCouponModalRef.current, {
            backdrop: false,
        });
    }, []);

    // 控制刪除modal開關
    useEffect(() => {
        if (isDeleteCouponModalOpen) {
            deleteModalRef.current.show();
        }
    }, [isDeleteCouponModalOpen]);

    // 關閉刪除modal
    const closeDeleteModal = () => {
        deleteModalRef.current.hide();
        setIsDeleteCouponModalOpen(false);
    };

    // 按鈕disabled狀態
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    // 刪除產品
    const deleteCoupon =  async() => {
        setIsLoading(true);
        try {
            await axios.delete(
                `${baseUrl}/api/${apiPath}/admin/coupon/${tempCoupon.id}`
            );
            closeDeleteModal();
            getCoupons(pageInfo.current_page);
            dispatch(
                pushMessage({
                    text: "優惠券已刪除",
                    status: "success",
                })
            );
        } catch (error) {
            dispatch(
                pushMessage({
                    text: `優惠券刪除失敗:${error.message}`,
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
                ref={deleteCouponModalRef}
                className="modal fade"
                id="delProductModal"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">刪除優惠券</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={closeDeleteModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            你是否要刪除
                            <span className="text-danger fw-bold">
                                {tempCoupon.title}
                            </span>
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
                                onClick={deleteCoupon}
                                disabled={isLoading}
                            >
                                刪除
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteCouponModal;
DeleteCouponModal.propTypes = {
    isDeleteCouponModalOpen: PropTypes.bool,
    setIsDeleteCouponModalOpen: PropTypes.func,
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