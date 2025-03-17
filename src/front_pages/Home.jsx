import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Home() {
    useEffect(() => {
        getProducts();
        new Swiper(swiperRef.current, {
            modules: [Autoplay, Pagination],
            loop: false,
            speed: 1500,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                767: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }, []);

    // 輪播ref
    const swiperRef = useRef(null);

    // 產品狀態
    const [products, setProducts] = useState([]);

    // 取得產品列表
    const getProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/${apiPath}/products`);
            setProducts(res.data.products);
        } catch (error) {
            showSwalError("取得產品失敗", error.response?.data?.message);
        }
    };

    // sweetalert錯誤提示
    const showSwalError = (text, error) => {
        withReactContent(Swal).fire({
            title: text,
            text: error,
            icon: "error",
        });
    };

    const kyusyuFeature = [
        {
            id: "-OLUYHuKXUPDNhHplP_6",
            title: "九洲溫泉",
            description:
                "九州被譽為「溫泉天堂」，擁有眾多知名的溫泉勝地。別府溫泉以其「地獄溫泉巡禮」聞名，遊客可以觀賞五彩繽紛的地熱景觀，感受大自然的奇妙力量。",
            imageUrl:
                "https://images.unsplash.com/photo-1644413638617-02369c89c156?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "hot spring",
        },
        {
            id: "-OG0I63L-yVhddLnsKMo",
            title: "自然景觀",
            description:
                "九州擁有壯麗的自然景觀，適合喜愛大自然的旅人細細探索。阿蘇火山是世界上最大級的破火山口，登上觀景台可以俯瞰壯觀的火山地貌，感受大地的脈動。高千穗峽則以鬼斧神工的峽谷美景著稱，泛舟於清澈的溪流之間，欣賞懸掛於峽壁之上的真名井瀑布，令人彷彿置身於神話之境。",
            imageUrl:
                "https://images.unsplash.com/photo-1698879434759-0a54b36a3233?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "natural view",
        },
        {
            id: "-OLUXAoISl0Q9mEdRYVF",
            title: "美食饗宴",
            description:
                "九州擁有豐富的飲食文化，讓饕客流連忘返。福岡的博多拉麵以濃厚的豚骨湯底和Q彈的細麵著稱，是必嚐的經典美味。",
            imageUrl:
                "https://images.unsplash.com/photo-1635379511574-bc167ca085c8?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "ramen",
        },
    ];

    const slides = [
        {
            id: 1,
            imageUrl:
                "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "深度遊覽",
            description:
                "如同私人導遊一樣帶您深入日本九州，我們提供專業的當地導遊及個人翻譯服務",
        },
        {
            id: 2,
            imageUrl:
                "https://images.unsplash.com/photo-1499419819507-77191b8ec46e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "高度自由",
            description:
                "筑紫會像是一般的旅客一樣跟客人體驗行程、也能夠像背包客一般依據自己的步調調整行程",
        },
        {
            id: 3,
            imageUrl:
                "https://images.unsplash.com/photo-1555337159-d399aaa99955?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "行程自由配",
            description:
                "如同DIY一樣，我們提供各式各樣的旅遊行程供您挑選並自由組合!",
        },
    ];

    return (
        <div className="container-fluid">
            <div
                className="position-absolute"
                style={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    backgroundPosition: "center center",
                    opacity: 0.6,
                    zIndex: -1,
                }}
            ></div>
            <div
                className="container d-flex flex-column"
                style={{ minHeight: "calc(100vh - 56px)" }}
            >
                <div className="row justify-content-center my-auto">
                    <div className="col-md-6 text-center">
                        <h2>Tsukushi Travel</h2>
                        <p className="text-muted mb-0">
                            探索九州，就從筑紫出發
                            <br />
                            想要讓日本旅遊多一點當地文化體驗與高活動度的行程嗎?
                            <br />
                            我們致力於深入暢遊九州，帶給您全新的日本旅遊體驗!
                        </p>
                        <Link
                            to="/products"
                            className="btn btn-dark rounded-0 mt-6"
                        >
                            立即探索
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row mt-5">
                    {kyusyuFeature.map((feature) => (
                        <div className="col-md-4 mt-md-4" key={feature.id}>
                            <Link
                                to={`/products/${feature.id}`}
                                className="text-decoration-none"
                            >
                                <div className="card border-0 mb-4">
                                    <img
                                        src={feature.imageUrl}
                                        className="card-img-top rounded-0 object-fit-cover"
                                        alt={feature.alt}
                                        height="250"
                                    />
                                    <div className="card-body text-center">
                                        <h4>{feature.title}</h4>
                                        <div className="d-flex justify-content-between">
                                            <p className="card-text text-muted mb-0">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {/* <div className="col-md-4 mt-md-4">
                        <div className="card border-0 mb-4">
                            <img
                                src="https://images.unsplash.com/photo-1555337159-d399aaa99955?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="card-img-top rounded-0 object-fit-cover"
                                alt="travel items"
                                height="250"
                            />
                            <div className="card-body text-center">
                                <h4>行程自由配</h4>
                                <div className="d-flex justify-content-between">
                                    <p className="card-text text-muted mb-0">
                                        如同DIY一樣，
                                        我們提供各式各樣的旅遊行程供您挑選並自由組合!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="container-fluid px-0">
                <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`carousel-item ${
                                    index === 0 ? "active" : ""
                                }`}
                            >
                                <div
                                    className="d-flex justify-content-center align-items-center text-white text-center"
                                    style={{
                                        backgroundImage: `url(${slide.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "60vh", // 固定高度，依需求調整
                                        width: "100%",
                                    }}
                                >
                                    <div className="bg-dark bg-opacity-50 p-3 rounded">
                                        <h3>{slide.title}</h3>
                                        <p>{slide.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* <div className="bg-light mt-7">
                <div className="container">
                    <div
                        id="carouselExampleControls"
                        className="carousel slide"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row justify-content-center py-7">
                                    <div className="col-md-6 text-center">
                                        <h3>123.</h3>
                                        <p className="my-5">12345</p>
                                        <p>
                                            <small>
                                                —Lorem ipsum dolor sit amet.—
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row justify-content-center py-7">
                                    <div className="col-md-6 text-center">
                                        <h3>Lorem ipsum.</h3>
                                        <p className="my-5">
                                            “Lorem ipsum dolor sit amet,
                                            consetetur sadipscing elitr, sed
                                            diam nonumy eirmod tempor invidunt
                                            ut labore et dolore magna aliquyam
                                            erat.”
                                        </p>
                                        <p>
                                            <small>
                                                —Lorem ipsum dolor sit amet.—
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row justify-content-center py-7">
                                    <div className="col-md-6 text-center">
                                        <h3>Lorem ipsum.</h3>
                                        <p className="my-5">
                                            “Lorem ipsum dolor sit amet,
                                            consetetur sadipscing elitr, sed
                                            diam nonumy eirmod tempor invidunt
                                            ut labore et dolore magna aliquyam
                                            erat.”
                                        </p>
                                        <p>
                                            <small>
                                                —Lorem ipsum dolor sit amet.—
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div> */}
            {/* 以下是原本的版型 */}
            {/* <div className="bg-light mt-7">
                <div className="container">
                    <div
                        id="carouselExampleControls"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row justify-content-center py-7">
                                    <div className="col-md-6 text-center">
                                        <h3>123.</h3>
                                        <p className="my-5">
                                            12345
                                        </p>
                                        <p>
                                            <small>
                                                —Lorem ipsum dolor sit amet.—
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row justify-content-center py-7">
                                    <div className="col-md-6 text-center">
                                        <h3>Lorem ipsum.</h3>
                                        <p className="my-5">
                                            “Lorem ipsum dolor sit amet,
                                            consetetur sadipscing elitr, sed
                                            diam nonumy eirmod tempor invidunt
                                            ut labore et dolore magna aliquyam
                                            erat.”
                                        </p>
                                        <p>
                                            <small>
                                                —Lorem ipsum dolor sit amet.—
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row justify-content-center py-7">
                                    <div className="col-md-6 text-center">
                                        <h3>Lorem ipsum.</h3>
                                        <p className="my-5">
                                            “Lorem ipsum dolor sit amet,
                                            consetetur sadipscing elitr, sed
                                            diam nonumy eirmod tempor invidunt
                                            ut labore et dolore magna aliquyam
                                            erat.”
                                        </p>
                                        <p>
                                            <small>
                                                —Lorem ipsum dolor sit amet.—
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a
                            className="carousel-control-prev"
                            href="#carouselExampleControls"
                            role="button"
                            data-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carouselExampleControls"
                            role="button"
                            data-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div> */}
            {/* 以上是原先的版型 */}

            {/* 以下是特色介紹 */}
            <div className="container my-7">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="car_gps"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-4 m-auto text-center">
                        <h4 className="mt-4">筑紫特色</h4>
                        <p className="text-muted">
                            我們專注於打造小班制深度旅行，每團人數僅約4至6人，讓旅客能夠更貼近當地文化與生活。
                            <br />
                            我們安排專屬司機兼導遊，全程陪伴解說，並提供私人翻譯服務。旅途中，我們像朋友一樣陪伴您探索隱藏的景點、品味道地美食，讓每段旅程都充滿溫度與獨特回憶。選擇筑紫旅遊，開啟一場專屬於您的深度之旅！
                        </p>
                    </div>
                </div>
                <div className="row flex-row-reverse justify-content-between mt-4">
                    <div className="col-md-6">
                        <img
                            src="https://images.unsplash.com/photo-1532623914234-70b82f9fdb85?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="natural view"
                            className="img-fluid object-fit-cover"
                        />
                    </div>
                    <div className="col-md-4 m-auto text-center">
                        <h4 className="mt-4">小而靈活</h4>
                        <p className="text-muted">
                            小型旅遊團最大的優勢在於行程彈性與交通便利。因為人數少，能依照團員的需求隨時調整行程，無論是臨時加停私房景點，還是延長停留時間，都能靈活安排。同時，採用小型車輛移動，不僅能輕鬆穿梭在狹窄巷弄或秘境景點，還省去了大團等待上下車的麻煩，讓旅程更自在順暢。這樣的安排讓每位旅客都能享受更貼心、更自由的旅行體驗。
                        </p>
                    </div>
                </div>
            </div>
            <div className="swiper mt-4 mb-5" ref={swiperRef}>
                <div className="swiper-wrapper mb-3">
                    {products.map((product) => (
                        <div className="swiper-slide" key={product.id}>
                            <Link
                                to={`/products/${product.id}`}
                                className="d-block text-decoration-none"
                            >
                                <div className="card border-0 mb-4 position-relative">
                                    <img
                                        src={product.imageUrl}
                                        className="card-img-top rounded-0 object-fit-cover"
                                        alt={product.title}
                                        height="200"
                                    />
                                    <div className="card-body p-0">
                                        <h4 className="mb-0 mt-3">
                                            {product.title}
                                        </h4>
                                        <p className="card-text mb-0">
                                            {/* <span className="text-muted ">
                                                            <del className="me-2">
                                                                NT$
                                                                {product?.origin_price?.toLocaleString()}
                                                            </del>
                                                        </span> */}
                                            NT$
                                            {product?.price?.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </div>
    );
}

export default Home;
