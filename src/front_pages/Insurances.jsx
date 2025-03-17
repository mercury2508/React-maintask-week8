import { useEffect } from "react";
import { Link, useLocation } from "react-router";

function Insurances() {

    // 判斷當前路徑是否為insurance
    const location = useLocation();
    useEffect(() => {
        const collapseOne = document.getElementById("collapseOne");
        const collapseTwo = document.getElementById("collapseTwo");
        if (location.pathname === "/insurance") {
            collapseOne?.classList.remove("show");
            collapseTwo?.classList.add("show");
        }
    }, [location]);

    // 側邊欄位內容(常見問題)
    const normalQuestion = [
        "關於付款方式",
        "關於優惠券使用方式",
        "如何取得優惠券?",
        "訂購後，如果想取消或改變行程，該如何處理?",
        "退款政策",
    ];

    // 側邊欄位內容(旅遊保險)
    const aboutInsurance = ["關於旅遊保險", "甚麼是旅遊不便險與平安險?"];

    // 常見問題內容
    const questionCardContent = [
        {
            title: "關於旅遊保險",
            content:
                "我們為旅客提供基本的旅遊平安險，保障範圍包含意外事故與緊急醫療。但若需更全面的保障，例如行李遺失、班機延誤、航班取消等，建議旅客自行投保旅遊不便險，以確保行程更安心無憂。",
        },
        {
            title: "甚麼是旅遊不便險與平安險",
            content:
                "旅遊平安險主要保障旅途中意外事故與突發傷害，而旅遊不便險則針對行程變動，如班機延誤、行李遺失等狀況提供補償。兩者互補，建議依需求搭配投保。",
        },
    ];

    // 常見問題側邊欄位
    const QuestionList = ({ title, link }) => {
        return (
            <li>
                <Link to={link} className="py-2 d-block text-muted">
                    {title}
                </Link>
            </li>
        );
    };

    // 常見問題右側欄位(回答)
    const QuestionCard = ({ title, content }) => {
        return (
            <div className="card border border-light">
                <div className="card-header fw-bold">{title}</div>
                <div className="card-body">
                    <p className="card-text">{content}</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container mt-md-5 mt-3 mb-7">
                    <div className="row">
                        <div className="col-md-3">
                            <div
                                className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
                                id="accordionExample"
                            >
                                <div className="card border-0">
                                    <div
                                        className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                                        id="headingOne"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                    >
                                        <div className="d-flex justify-content-between align-items-center pe-1">
                                            <h4 className="mb-0">常見問題</h4>
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>
                                    <div
                                        id="collapseOne"
                                        className="collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="card-body py-0">
                                            <ul className="list-unstyled">
                                                {normalQuestion.map((title) => (
                                                    <QuestionList
                                                        title={title}
                                                        key={title}
                                                        link={"/service"}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0">
                                    <div
                                        className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                                        id="headingTwo"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                    >
                                        <div className="d-flex justify-content-between align-items-center pe-1">
                                            <h4 className="mb-0">旅遊保險</h4>
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>
                                    <div
                                        id="collapseTwo"
                                        className="collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="card-body py-0">
                                            <ul className="list-unstyled">
                                                {aboutInsurance.map((title) => (
                                                    <QuestionList
                                                        title={title}
                                                        key={title}
                                                        link={"/insurance"}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            {questionCardContent.map((cardContent) => (
                                <QuestionCard
                                    title={cardContent.title}
                                    content={cardContent.content}
                                    key={cardContent.title}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Insurances;
