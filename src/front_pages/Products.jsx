import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { LoadingContext } from "../LoadingContext";
// import ReactLoading from "react-loading";
import ScreenLoading from "../components/ScreenLoading";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Products() {
    const [products, setProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);

    useEffect(() => {
        const getProducts = async () => {
            setIsScreenLoading(true);
            try {
                const res = await axios.get(
                    `${baseUrl}/api/${apiPath}/products`
                );
                setProducts(res.data.products);
                // console.log(res.data.products);
            } catch (error) {
                // showSwalError("取得產品失敗", error.response?.data?.message);
                console.log(error)
            } finally {
                setIsScreenLoading(false);
            }
        };
        getProducts();
    }, []);

    // // 加入購物車
    // const addToCart = async (product, qty = 1) => {
    //     setIsLoading(true);
    //     const productData = {
    //         data: {
    //             product_id: product.id,
    //             qty: Number(qty),
    //         },
    //     };
    //     try {
    //         await axios.post(`${baseUrl}/api/${apiPath}/cart`, productData);
    //         showSwal("已加入購物車");
    //     } catch (error) {
    //         showSwalError("加入購物車失敗", error.response?.data?.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // // sweetalert成功提示
    // const showSwal = (text) => {
    //     withReactContent(Swal).fire({
    //         title: text,
    //         icon: "success",
    //         toast: true,
    //         position: "top-end",
    //         showConfirmButton: false,
    //         timer: 1500,
    //         timerProgressBar: true,
    //         width: "20%",
    //     });
    // };

    // // sweetalert錯誤提示
    // const showSwalError = (text, error) => {
    //     withReactContent(Swal).fire({
    //         title: text,
    //         text: error,
    //         icon: "error",
    //     });
    // };

    return (
        <div className="container-fluid">
            <div
                className="position-relative d-flex align-items-center justify-content-center"
                style={{ minHeight: "400px" }}
            >
                <div
                    className="position-absolute"
                    style={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
                        backgroundPosition: "center center",
                        opacity: 0.1,
                    }}
                ></div>
                <h2 className="fw-bold">頂部圖片</h2>
            </div>
            <div className="container mt-md-5 mt-3 mb-7">
                <div className="row">
                    <div className="col-md-4">
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
                                        <h4 className="mb-0">側邊欄位</h4>
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
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    側邊欄位細項
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
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
                                        <h4 className="mb-0">Lorem ipsum</h4>
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
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-0">
                                <div
                                    className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                                    id="headingThree"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                >
                                    <div className="d-flex justify-content-between align-items-center pe-1">
                                        <h4 className="mb-0">Lorem ipsum</h4>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div
                                    id="collapseThree"
                                    className="collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="card-body py-0">
                                        <ul className="list-unstyled">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="py-2 d-block text-muted"
                                                >
                                                    Lorem ipsum
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-8">
                        <div className="row">
                            {products.map((product)=>(
                                <div className="col-md-6" key={product.id}>
                                    <div className="card border-0 mb-4 position-relative position-relative">
                                        <img
                                            src={product.imageUrl}
                                            className="card-img-top rounded-0 object-fit-cover"
                                            alt={product.title}
                                            height="250"
                                        />
                                        {/* 我的最愛 */}
                                        <a href="#" className="text-dark">
                                            <i
                                                className="far fa-heart position-absolute"
                                                style={{
                                                    right: "16px",
                                                    top: "16px",
                                                }}
                                            ></i>
                                        </a>
                                        <div className="card-body p-0">
                                            <h4 className="mb-0 mt-3">
                                                <Link to={`/products/${product.id}`}>
                                                {product.title}
                                                </Link>
                                            </h4>
                                            <p className="card-text mb-0">
                                                NT${product.price.toLocaleString()}
                                                <span className="text-muted ">
                                                    <del>NT${product.origin_price.toLocaleString()}</del>
                                                </span>
                                            </p>
                                            <p className="text-muted mt-3"></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* 產品底部分頁 */}
                        <nav className="d-flex justify-content-center">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Previous"
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Next"
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            {isScreenLoading && <ScreenLoading/>}
        </div>
    );
}

export default Products;
