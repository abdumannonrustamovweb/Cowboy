import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import { getImageUrl } from "../api/productApi";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));

  const EmptyCart = () => (
    <div className="container py-5 text-center">
      <p className="fs-4 text-muted mb-4">
        Siz hali hech qanday mahsulot tanlamagansiz 😕
      </p>
      <Link to="/" className="btn btn-outline-dark">
        <i className="fa fa-arrow-left me-2"></i> Maxsulotlar sahifasiga o'tish
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <h2 className="mb-4 fw-bold text-primary">
              🛒 Savatdagi mahsulotlar
            </h2>
            {state.map((item) => (
              <div
                key={item.id}
                className="card mb-3 shadow border-0 rounded-4 overflow-hidden"
              >
                <div className="row g-0">
                  <div className="col-12 col-md-4 d-flex align-items-center justify-content-center bg-light p-2">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "200px",
                        objectFit: "contain",
                        borderRadius: "12px",
                      }}
                      onError={(e) => (e.target.src = "/default.jpg")}
                    />
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="card-body d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="card-title text-dark fw-semibold">
                          {item.title}
                        </h5>
                        <p className="card-text text-muted">
                          {item.qty} ×{" "}
                          <span className="text-success">
                            ${item.price.toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            onClick={() => removeItem(item)}
                            className="btn btn-danger btn-sm rounded-pill"
                            disabled={item.qty <= 0}
                            title="Kamaytirish"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="btn btn-light btn-sm fw-bold text-primary rounded px-3">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => addItem(item)}
                            className="btn btn-success btn-sm rounded-pill"
                            title="Qo‘shish"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title mb-3 text-primary fw-bold">
                  Buyurtma Tafsilotlari
                </h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Maxsulotlar ({totalItems} dona):</span>
                    <strong className="text-success">
                      ${subtotal.toLocaleString()}
                    </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between fw-bold border-top pt-2">
                    <span>Umumiy:</span>
                    <span className="text-danger">
                      ${subtotal.toLocaleString()}
                    </span>
                  </li>
                </ul>
                <Link
                  to="/checkout"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  🧾 Zakazni rasmiylashtirish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4 text-dark fw-bold">Savat</h1>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
