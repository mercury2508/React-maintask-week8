import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "../LoadingContext";
import axios from "axios";
import { useNavigate } from "react-router";

import CouponModal from "../components/CouponModal";
import DeleteCouponModal from "../components/DeleteCouponModal";

import ScreenLoading from "../components/ScreenLoading";
import Pagination from "../components/Pagination";

import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Coupon() {
    const defaultModalState = {
        title: "",
        is_enabled: 0,
        percent: 0,
        due_date: 0,
        code: "",
    };

    // 全畫面loading狀態
    const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 優惠券列表
    const [coupons, setCoupons] = useState([]);

    // 控制開關CouponModal
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

    // modal狀態為新增or編輯
    const [couponModalState, setCouponModalState] = useState(null);

    // 優惠券modal內容
    const [tempCoupon, setTempCoupon] = useState(defaultModalState);

    // 頁面狀態
    const [pageInfo, setPageInfo] = useState({});

    // 控制開關deleteCouponModalOpen
    const [isDeleteCouponModalOpen, setIsDeleteCouponModalOpen] =
        useState(false);

    // 取得優惠券列表
    const gettingCoupons = useCallback((page)=>{
        const getCoupons = async (page = 1) => {
            setIsScreenLoading(true);
            try {
                const res = await axios.get(
                    `${baseUrl}/api/${apiPath}/admin/coupons?page=${page}`
                );
                setCoupons(res.data.coupons); // res.data.coupons 陣列包物件
                setPageInfo(res.data.pagination);
            } catch (error) {
                dispatch(
                    pushMessage({
                        text: `取得優惠券功能失敗:${error.response.data.message}`,
                        status: "failed",
                    })
                );
            } finally {
                setIsScreenLoading(false);
            }
        };
        getCoupons(page);

    },[dispatch, setIsScreenLoading]);

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

        gettingCoupons();
    }, [gettingCoupons, navigate]);

    // 開啟modal，點編輯的話則帶入產品原先內容
    const openCouponModal = (mod, coupon) => {
        setCouponModalState(mod);
        if (mod === "add") {
            setTempCoupon(defaultModalState);
        } else if (mod === "edit") {
            setTempCoupon(coupon);
        }
        setIsCouponModalOpen(true);
    };

    // 時間格式化
    const formatTime = (timeStamp) => {
        const time = new Date(timeStamp * 1000);

        return `${time.getFullYear()}年${
            time.getMonth() + 1
        }月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    };

    // 開啟刪除modal
    const openDeleteModal = (coupon) => {
        setTempCoupon(coupon);
        setIsDeleteCouponModalOpen(true);
    };

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-between mb-3">
                            <h2>優惠券管理</h2>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    openCouponModal("add");
                                }}
                            >
                                新增優惠券
                            </button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">優惠券名稱</th>
                                    <th scope="col">優惠代碼</th>
                                    <th scope="col">優惠額度</th>
                                    <th scope="col">啟用狀態</th>
                                    <th scope="col">有效期限</th>
                                    <th scope="col">編輯優惠券</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons?.map((coupon) => (
                                    <tr key={coupon.id}>
                                        <th scope="row">{coupon.title}</th>
                                        <td>{coupon.code}</td>
                                        <td>{coupon.percent}%</td>
                                        <td>
                                            {coupon.is_enabled ? (
                                                <span
                                                    style={{ color: "green" }}
                                                >
                                                    已啟用
                                                </span>
                                            ) : (
                                                "未啟用"
                                            )}
                                        </td>
                                        <td>{formatTime(coupon?.due_date)}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => {
                                                        openCouponModal(
                                                            "edit",
                                                            coupon
                                                        );
                                                    }}
                                                >
                                                    編輯
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() =>
                                                        openDeleteModal(coupon)
                                                    }
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
                <Pagination getProducts={gettingCoupons} pageInfo={pageInfo} />
            </div>
            <CouponModal
                isCouponModalOpen={isCouponModalOpen}
                setIsCouponModalOpen={setIsCouponModalOpen}
                couponModalState={couponModalState}
                tempCoupon={tempCoupon}
                getCoupons={gettingCoupons}
                pageInfo={pageInfo}
            />
            <DeleteCouponModal
                isDeleteCouponModalOpen={isDeleteCouponModalOpen}
                setIsDeleteCouponModalOpen={setIsDeleteCouponModalOpen}
                tempCoupon={tempCoupon}
                getCoupons={gettingCoupons}
                pageInfo={pageInfo}
            />
            {isScreenLoading && <ScreenLoading />}
        </>
    );
}

export default Coupon;
