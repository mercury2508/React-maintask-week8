import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ScreenLoading from "../components/ScreenLoading";
import { LoadingContext } from "../LoadingContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import ReactLoading from "react-loading";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function ProductDetail() {
    
    const params = useParams();
    const { id } = params;
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [qtySelect, setQtySelect] = useState(1);
    const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);

    useEffect(() => {
        (async () => {
            setIsScreenLoading(true);
            try {
                const res = await axios.get(
                    `${baseUrl}/api/${apiPath}/product/${id}`
                );
                setProduct(res.data.product);
            } catch (error) {
                showSwalError("取得產品失敗", error.response?.data?.message);
                console.log("取得產品失敗", error.response?.data?.message)
            } finally {
                setIsScreenLoading(false);
            }
        })();
    }, []);

        // sweetalert成功提示
        const showSwal = (text) => {
            withReactContent(Swal).fire({
                title: text,
                icon: "success",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                width: "20%",
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
    
        // 加入購物車
        const addToCart = async (product, qty = 1) => {
            setIsLoading(true);
            const productData = {
                data: {
                    product_id: product.id,
                    qty: Number(qty),
                },
            };
            try {
                await axios.post(`${baseUrl}/api/${apiPath}/cart`, productData);
                showSwal("已加入購物車");
                // console.log(res);
            } catch (error) {
                showSwalError("加入購物車失敗", error.response?.data?.message);
            } finally {
                setIsLoading(false);
            }
        };

    return (
        <div className="container-fluid">
            <div className="container">
                {isScreenLoading ? <ScreenLoading/> : (    
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div
                                id="carouselExampleControls"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src={product.imageUrl}
                                            className="d-block w-100 object-fit-cover"
                                            alt={product.title}
                                            height="400"

                                        />
                                    </div>
                                </div>

                                {/* 輪播按鈕 < > */}
                                {/* <a
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
                                </a> */}

                            </div>
                        </div>
                        <div className="col-md-5">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                                    <li className="breadcrumb-item">
                                        <Link
                                            className="text-muted"
                                            to="/"
                                        >
                                            首頁
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link
                                            className="text-muted"
                                            to="/products"
                                        >
                                            行程一覽
                                        </Link>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        行程特色
                                    </li>
                                </ol>
                            </nav>
                            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
                            <p className="mb-0 text-muted text-end">
                                <del>NT${product?.origin_price?.toLocaleString()}</del>
                            </p>
                            <p className="h4 fw-bold text-end">NT${(product?.price * qtySelect)?.toLocaleString()}</p>
                            <div className="input-group my-3 bg-light rounded">
                                <select
                                    value={qtySelect}
                                    onChange={(e) =>
                                        setQtySelect(e.target.value)
                                    }
                                    id="qtySelect"
                                    className="form-select"
                                >
                                    {Array.from({ length: 10 }).map(
                                        (_, index) => (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                共 {index + 1} 名
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        addToCart(product, qtySelect)
                                    }
                                    disabled={isLoading}
                                    className="text-nowrap btn btn-dark w-100 py-2"
                                >
                                    立即報名
                                </button>
                            </div>

                        </div>
                    </div>
                )}
                <div className="row my-5">
                    <div className="col-md-4">
                        <p>
                            {product.description}
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p className="text-muted">
                            Lorem ipsum dolor sit amet, consetetur sadipscing
                            elitr, sed diam nonumy eirmod tempor
                        </p>
                    </div>
                </div>
                <h3 className="fw-bold">Lorem ipsum dolor sit amet</h3>
                <div className="swiper mt-4 mb-5">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="card border-0 mb-4 position-relative position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                                    className="card-img-top rounded-0"
                                    alt="..."
                                />
                                <a href="#" className="text-dark"></a>
                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-3">
                                        <a href="#">Lorem ipsum</a>
                                    </h4>
                                    <p className="card-text mb-0">
                                        NT$1,080
                                        <span className="text-muted ">
                                            <del>NT$1,200</del>
                                        </span>
                                    </p>
                                    <p className="text-muted mt-3"></p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="card border-0 mb-4 position-relative position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                                    className="card-img-top rounded-0"
                                    alt="..."
                                />
                                <a href="#" className="text-dark"></a>
                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-3">
                                        <a href="#">Lorem ipsum</a>
                                    </h4>
                                    <p className="card-text mb-0">
                                        NT$1,080
                                        <span className="text-muted ">
                                            <del>NT$1,200</del>
                                        </span>
                                    </p>
                                    <p className="text-muted mt-3"></p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="card border-0 mb-4 position-relative position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                                    className="card-img-top rounded-0"
                                    alt="..."
                                />
                                <a href="#" className="text-dark"></a>
                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-3">
                                        <a href="#">Lorem ipsum</a>
                                    </h4>
                                    <p className="card-text mb-0">
                                        NT$1,080
                                        <span className="text-muted ">
                                            <del>NT$1,200</del>
                                        </span>
                                    </p>
                                    <p className="text-muted mt-3"></p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="card border-0 mb-4 position-relative position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                                    className="card-img-top rounded-0"
                                    alt="..."
                                />
                                <a href="#" className="text-dark"></a>
                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-3">
                                        <a href="#">Lorem ipsum</a>
                                    </h4>
                                    <p className="card-text mb-0">
                                        NT$1,080
                                        <span className="text-muted ">
                                            <del>NT$1,200</del>
                                        </span>
                                    </p>
                                    <p className="text-muted mt-3"></p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="card border-0 mb-4 position-relative position-relative">
                                <img
                                    src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                                    className="card-img-top rounded-0"
                                    alt="..."
                                />
                                <a href="#" className="text-dark"></a>
                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-3">
                                        <a href="#">Lorem ipsum</a>
                                    </h4>
                                    <p className="card-text mb-0">
                                        NT$1,080
                                        <span className="text-muted ">
                                            <del>NT$1,200</del>
                                        </span>
                                    </p>
                                    <p className="text-muted mt-3"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
