import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DeleteProductModal from "../components/DeleteProductModal";

import { LoadingContext } from "../LoadingContext";
import ScreenLoading from "../components/ScreenLoading";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: 0,
  price: 0,
  description: "",
  content: "",
  is_enabled: 0,
  popularity: "",
  imagesUrl: [""],
};

function AdminProducts() {
  // 全畫面loading狀態
  const { isScreenLoading, setIsScreenLoading } = useContext(LoadingContext);

  // 取得產品列表
  const gettingProducts = useCallback(
    (page) => {
      const getProducts = async (page = 1) => {
        setIsScreenLoading(true);
        try {
          const res = await axios.get(
            `${baseUrl}/api/${apiPath}/admin/products?page=${page}`
          );
          setProducts(res.data.products);
          setPageInfo(res.data.pagination);
        } catch (error) {
          alert(error.response.data.message);
        } finally {
          setIsScreenLoading(false);
        }
      };

      getProducts(page);
    },
    [setIsScreenLoading]
  );

  // 預設取得產品 & axios的headers請求預設夾帶token
  useEffect(() => {
    const token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    gettingProducts();
  }, [gettingProducts]);

  // 產品列表狀態
  const [products, setProducts] = useState([]);

  // 頁面狀態
  const [pageInfo, setPageInfo] = useState({});

  // modal狀態為新增or編輯
  const [modalState, setModalState] = useState(null);

  // 產品modal狀態
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  // 控制開關ProductModal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // 控制開關DeleteProductModal
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);

  // 開啟modal，點編輯的話則帶入產品原先內容
  const openModal = (mod, product) => {
    setModalState(mod);
    if (mod === "add") {
      setTempProduct(defaultModalState);
    } else if (mod === "edit") {
      setTempProduct(product);
    }
    setIsProductModalOpen(true);
  };

  // 開啟刪除modal
  const openDeleteModal = (product) => {
    setTempProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  // 排序state
  const [sortState, setSortState] = useState("");

  // 依售價排序功能
  const handleSortByPrice = (e) => {
    setSortState(e.target.value);
    if (sortState === "high") {
      const sorted = [...products];
      setProducts(sorted.sort((a, b) => a.price - b.price));
    } else if (sortState === "low") {
      const sorted = [...products];
      setProducts(sorted.sort((a, b) => b.price - a.price));
    } else {
      // getProducts();
      gettingProducts();
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between mb-3">
              <h2>產品管理</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  openModal("add");
                }}
              >
                新增產品
              </button>
            </div>
            <div className="mb-3 d-flex">
              <select
                name="sortPrice"
                id=""
                value={sortState}
                onChange={(e) => handleSortByPrice(e)}
              >
                <option value="" disabled>
                  -- 請選擇排序 --
                </option>
                <option value="high">售價高至低</option>
                <option value="low">售價低至高</option>
              </select>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">熱門程度</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">編輯商品</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price.toLocaleString()}</td>
                    <td>{product.price.toLocaleString()}</td>
                    <td>{product.popularity}</td>
                    <td>
                      {product.is_enabled ? (
                        <span style={{ color: "green" }}>已啟用</span>
                      ) : (
                        "未啟用 "
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            openModal("edit", product);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => openDeleteModal(product)}
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
        <Pagination getProducts={gettingProducts} pageInfo={pageInfo} />
      </div>
      <ProductModal
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        modalState={modalState}
        tempProduct={tempProduct}
        getProducts={gettingProducts}
        pageInfo={pageInfo}
      />
      <DeleteProductModal
        isDeleteProductModalOpen={isDeleteProductModalOpen}
        setIsDeleteProductModalOpen={setIsDeleteProductModalOpen}
        tempProduct={tempProduct}
        getProducts={gettingProducts}
        pageInfo={pageInfo}
      />
      {isScreenLoading && <ScreenLoading />}
    </>
  );
}

export default AdminProducts;
