import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));

  const EmptyCart = () => (
    <div className="container py-5 text-center">
      <p className="fs-4 text-muted mb-4">Siz hali hech qanday mahsulot tanlamagansiz 😕</p>
      <Link to="/" className="btn btn-outline-dark">
        <i className="fa fa-arrow-left me-2"></i> Maxsulotlar sahifasiga o'tish
      </Link>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;
    const shipping = 30;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-5">
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <h2 className="mb-4">Savatdagi mahsulotlar</h2>
            {state.map((item) => (
              <div key={item.id} className="card mb-3 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4 text-center d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid p-3"
                      style={{ height: "150px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="col-md-8 d-flex flex-column justify-content-between p-3">
                    <div>
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-muted">
                        {item.qty} × ${item.price.toLocaleString()}
                      </p>
                    </div>
                    {/* Tugmalar o‘ng pastki burchakda */}
                    <div className="d-flex justify-content-end mt-auto">
                      <div className="btn-group">
                        <button
                          onClick={() => removeItem(item)}
                          className="btn btn-outline-secondary"
                          disabled={item.qty === 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="btn btn-light">{item.qty}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="btn btn-outline-secondary"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title mb-3">Buyurtma Tafsilotlari</h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Maxsulotlar ({totalItems} dona):</span>
                    <strong>${subtotal.toLocaleString()}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Yetkazib berish:</span>
                    <strong>${shipping}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between fw-bold border-top pt-2">
                    <span>Umumiy:</span>
                    <span>${(subtotal + shipping).toLocaleString()}</span>
                  </li>
                </ul>
                <Link
                  to="/checkout"
                  className="btn btn-dark w-100"
                >
                  Zakazni rasmiylashtirish
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
        <h1 className="text-center mb-4">Savat</h1>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
