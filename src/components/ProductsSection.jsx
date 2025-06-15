import  { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import useProductStore from "../store/useProductStore";
import ProductCard from "./ProductCard";

import "react-loading-skeleton/dist/skeleton.css";

const ProductsSection = () => {
  const { i18n, t } = useTranslation();
  
  const { products, loading, error, fetchProducts, removeProduct } = useProductStore();

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          >
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <h5>{t("products")}</h5>
        </div>

        {products.map((product) => <ProductCard product={product} />)}
      </>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">{t("product")}</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default ProductsSection;
