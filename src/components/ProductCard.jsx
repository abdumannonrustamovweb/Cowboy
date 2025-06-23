import React from "react";
import toast from "react-hot-toast";
import { getImageUrl } from "../api/productApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Savatga qo‘shildi ✅");
  };

  return (
    <div
      id={product.id}
      key={product.id}
      className="col-md-4 col-sm-6 col-12 mb-4"
    >
      <div className="card h-100 shadow rounded-4 border-0 overflow-hidden">
        <div className="bg-light text-center" style={{ padding: "1rem" }}>
          <img
            className="img-fluid rounded"
            src={getImageUrl(product.image)}
            alt={product.title}
            style={{
              height: "230px",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title fw-semibold text-primary">
            {product.title ? product.title.substring(0, 30) + "..." : ""}
          </h5>
          <p className="card-text text-muted mb-2">
            {product.description
              ? product.description.substring(0, 90) + "..."
              : ""}
          </p>
          <p className="text-dark fw-medium">{product.name}</p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item fs-5 fw-bold text-success">
            {product.price} $
          </li>
        </ul>

        <div className="card-body d-flex justify-content-around">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-primary px-3"
          >
            {t("savat1")}
          </Link>
          <button
            className="btn btn-primary px-3"
            onClick={() => addProduct(product)}
          >
            {t("savat")}
          </button>
        </div>
      </div>
    </div>
  );
}
