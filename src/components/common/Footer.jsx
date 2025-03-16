import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Footer() {
    // sweetalert結帳成功提示
    const showSwalSuccess = (text, message) => {
        withReactContent(Swal).fire({
            title: text,
            text: message,
            icon: "success",
        });
    };

    // sweetalert錯誤提示
    const showSwalError = (text, error) => {
        withReactContent(Swal).fire({
            title: text,
            text: error,
            icon: "error",
        });
    };

    // 表單驗證
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({});

    // 訂閱電子報
    const subscribeEmail = handleSubmit(
        (data) => {
            const { ...user } = data;
            const emailData = {
                data: {
                    user,
                },
            };
            showSwalSuccess(
                "已成功訂閱電子報!",
                "感謝您的訂閱，敬請期待我們的最新消息及活動!"
            );
            reset();
        },
        (error) => {
            if (error.email) {
                showSwalError("Email 格式錯誤", errors?.email?.message);
            }
        }
    );

    return (
        <>
            <div className="bg-light py-4">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
                        {/* 標題段落 */}
                        <p className="mb-0 fw-bold col-12 col-md-6 mb-2 mb-md-0 text-center text-md-start">
                            歡迎訂閱我們的電子報!
                        </p>

                        {/* Email 訂閱表單 */}
                        <div className="col-12 col-md-6">
                            <form
                                action=""
                                onSubmit={subscribeEmail}
                                className="d-flex mt-3 mt-md-0 w-100"
                            >
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="輸入Email以取得最新活動與消息!"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email為必填",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Email格式錯誤",
                                        },
                                    })}
                                />
                                <button
                                    className="btn btn-dark rounded-0 ms-2"
                                    type="submit"
                                >
                                    訂閱
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="bg-light py-4">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start w-100">
                        <p className="mb-0 fw-bold col-6">
                            歡迎訂閱我們的電子報!
                        </p>
                        <div className="col-md-6">
                            <form
                                action=""
                                onSubmit={subscribeEmail}
                                className="input-group mt-md-0 mt-3"
                            >
                                <div className="input-group w-md-50 mt-md-0 mt-3 flex-fill">
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="輸入Email以取得最新活動與消息!"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "Email為必填",
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Email格式錯誤",
                                            },
                                        })}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-dark rounded-0"
                                            type="submit"
                                            id="search"
                                        >
                                            訂閱
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="bg-dark py-5">
                <div className="container">
                    <div className="d-flex flex-row align-items-stretch justify-content-center text-white">
                        <div className="col-4 border ">
                            <h3>聯絡我們</h3>
                            <p>電話：02-9876-5432</p>
                            <p className="text-break">Email：test@gmail.com</p>
                            <p>服務時間：週一至週五 09:00-18:00</p>
                            <p>地址：台灣旅遊市停機坪一段80號</p>
                        </div>
                        <div className="col-4 border ps-4">
                            <h3>購買指南</h3>
                            <p>常見問題</p>
                            <p>關於航班</p>
                            <p>退款說明</p>
                        </div>
                        <div className="d-flex flex-column col-4 border">
                            <div className="d-flex col">
                                <ul className="d-flex list-unstyled mb-0 h4">
                                    <li>
                                        <a href="#" className="text-white mx-3">
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white mx-3">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white ms-3">
                                            <i className="fab fa-line"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex col">
                                <p className="mt-auto border">
                                    © 2025 筑紫旅遊 All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="bg-dark py-5">
                <div className="container">
                    {/* RWD調整：在小螢幕（小於576px）變成垂直排列 */}
                    <div className="d-flex flex-column flex-md-row align-items-stretch justify-content-center text-white">
                        {/* 聯絡我們 */}
                        <div className="col-12 col-md-4 border mb-4 mb-md-0">
                            <h3>聯絡我們</h3>
                            <p>電話：02-9876-5432</p>
                            <p className="text-break">Email：test@gmail.com</p>
                            <p>服務時間：週一至週五 09:00-18:00</p>
                            <p>地址：台灣旅遊市停機坪一段80號</p>
                        </div>

                        {/* 購買指南 */}
                        <div className="col-12 col-md-4 border ps-md-4 mb-4 mb-md-0">
                            <h3>購買指南</h3>
                            <p>常見問題</p>
                            <p>關於航班</p>
                            <p>退款說明</p>
                        </div>

                        {/* 社群與版權 */}
                        <div className="d-flex flex-column col-12 col-md-4 border">
                            {/* 社群連結 */}
                            <div className="d-flex justify-content-center mb-3">
                                <ul className="d-flex list-unstyled mb-0 h4">
                                    <li>
                                        <a href="#" className="text-white mx-3">
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white mx-3">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-white ms-3">
                                            <i className="fab fa-line"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* 版權聲明 */}
                            <div className="text-center mt-auto">
                                <p className="border">
                                    © 2025 筑紫旅遊 All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
