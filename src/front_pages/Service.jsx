import { Link } from "react-router";

function Service() {
    // 常見問題內容
    const questionCardContent = [
        {
            title: "關於付款方式",
            content:
                "本產品為旅遊套票行程，其中部分行程須提前預訂，因此所有套票行程均需全額付款以確保您的預約權益。",
        },
        {
            title: "關於優惠券使用方式",
            content:
                "取得優惠券代碼後，可以在購物車頁面的「請輸入優惠券」欄位輸入。",
        },
        {
            title: "如何取得優惠券?",
            content:
                "我們會不定期舉辦活動，優惠券會以電子報的形式給予，歡迎訂閱我們的電子報以便取得最新的折扣!",
        },
        {
            title: "訂購後，如果想取消或改變行程，該如何處理?",
            content:
                "如果您需要取消或更改行程，我們建議您儘早通知我們。提前通知有助於爭取全額退款或順利調整行程。若在出發前 7～14 天才進行變更或取消，可能會影響退款的金額。詳細規定請參考退款政策，我們將盡力協助您處理。",
        },
        {
            title: "退款政策",
            content:
                "若於出發前 7～14 天取消，可能需支付部分費用；出發前 3～7 天取消，僅退回 50%。若於出發當日或前 1～3 天取消，恕無法退款。建議行程確認後再預訂，以避免損失。",
        },
    ];

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

    // 側邊欄位內容
    const normalQuestion = [
        "關於付款方式",
        "關於優惠券使用方式",
        "如何取得優惠券?",
        "訂購後，如果想取消或改變行程，該如何處理?",
        "退款政策",
    ];

    // 側邊欄位內容(旅遊保險)
    const aboutInsurance = ["關於旅遊保險", "甚麼是旅遊不便險與平安險?"];

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

    return (
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
    );
}

export default Service;
