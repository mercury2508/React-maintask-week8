import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { LoadingContext } from "../LoadingContext";

import ScreenLoading from "../components/ScreenLoading";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);
  const [selectedCategory, setSelectedCategory] = useState("全部");
  // 頁面狀態
  const [pageInfo, setPageInfo] = useState({});

  // 取得產品列表(可以帶page, category參數)
  const gettingProducts = useCallback(
    (page) => {
      const getProducts = async (page = 1) => {
        setIsScreenLoading(true);
        try {
          const res = await axios.get(
            `${baseUrl}/api/${apiPath}/products?page=${page}&category=${
              selectedCategory === "全部" ? "" : selectedCategory
            }`
          );
          setProducts(res.data.products);
          setPageInfo(res.data.pagination);
        } catch (error) {
          showSwalError("取得產品失敗", error.response?.data?.message);
        } finally {
          setIsScreenLoading(false);
        }
      };
      getProducts(page);
    },
    [selectedCategory, setIsScreenLoading]
  );

  useEffect(() => {
    gettingProducts();
  }, [gettingProducts, selectedCategory]);

  // 取得產品列表(無法帶page, category參數)
  const gettingAllProducts = useCallback(() => {
    const getAllProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
        setAllProducts(res.data.products);
      } catch (error) {
        showSwalError("取得產品失敗", error.response?.data?.message);
      } finally {
        setIsScreenLoading(false);
      }
    };
    getAllProducts();
  }, [setIsScreenLoading]);

  useEffect(() => {
    gettingAllProducts();
  }, [gettingAllProducts]);

  // 產品類別資料
  const categories = [
    "全部",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  // sweetalert錯誤提示
  const showSwalError = (text, error) => {
    withReactContent(Swal).fire({
      title: text,
      text: error,
      icon: "error",
    });
  };

  // 特色類別開關
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div className="container-fluid">
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
                  onClick={toggleCollapse}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">特色類別</h4>
                    <i
                      className={`fas fa-chevron-down ${
                        isOpen ? "rotate-180" : ""
                      } transition-all`}
                    ></i>
                  </div>
                </div>
                {isOpen && (
                  <div id="collapseOne" className="collapse show">
                    <div className="card-body py-0">
                      <ul className="list-unstyled">
                        {categories.map((category) => (
                          <li key={category}>
                            <button
                              className="btn py-2 d-block text-muted border-none"
                              onClick={() => setSelectedCategory(category)}
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row">
              {products.map((product) => (
                <div className="col-md-6 mb-4" key={product.id}>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card mb-4 position-relative h-100">
                      <img
                        src={product.imageUrl}
                        className="card-img-top rounded-0 object-fit-cover"
                        alt={product.title}
                        height="250"
                      />
                      <div className="card-body">
                        <h4 className="card-title mb-0">{product.title}</h4>
                        <p className="card-text mb-0">
                          NT$
                          {product.price.toLocaleString()}
                        </p>
                        <p className="text-muted mt-3">{product.content}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <Pagination getProducts={gettingProducts} pageInfo={pageInfo} />
          </div>
        </div>
      </div>
      {isScreenLoading && <ScreenLoading />}
    </div>
  );
}

export default Products;
