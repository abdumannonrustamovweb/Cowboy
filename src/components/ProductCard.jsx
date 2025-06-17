import React from "react";
import toast from "react-hot-toast";
import { getImageUrl } from "../api/productApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
  const { i18n, t } = useTranslation();

  const dispatch = useDispatch();
  const addProduct = (product) => dispatch(addCart(product));

  return (
    <div
      id={product.id}
      key={product.id}
      className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
    >
      <div className="card text-center h-100">
<img
  className="card-img-top p-2 mx-auto object-contain"
  src={getImageUrl(product.image)}
  alt="Card"
  style={{
    width: "100%",         // kartaga to‘liq sig‘adi
    height: "500px",       // rasmni biroz uzun qiladi
    objectFit: "contain",  // nisbatni saqlaydi
  }}
/>


        <div className="card-body">
          <h5 className="card-title">
            {product.title ? product.title.substring(0, 12) + "..." : ""}
          </h5>
          <p className="card-text">
            {product.description
              ? product.description.substring(0, 90) + "..."
              : ""}
          </p>
          <p>{product.name}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item lead">{product.price} $</li>
        </ul>
        <div className="card-body">
          <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
            {t("savat1")}
          </Link>
          <button
            className="btn btn-dark m-1"
            onClick={() => {
              toast.success("Added to cart");
              // addProduct(product);
            }}
          >
            {t("savat")}
          </button>
        </div>
      </div>
    </div>
  );
}
