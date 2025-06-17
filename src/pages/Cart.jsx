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
    <div className="text-center py-20">
      <p className="text-xl text-gray-600 mb-6">Siz hali hech qanday mahsulot tanlamagansiz 😕</p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-2 border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition duration-300"
      >
        <i className="fa fa-arrow-left mr-2"></i> Maxsulotlar sahifasiga o'tish
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
      <section className="py-12 bg-gray-50 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Savatdagi mahsulotlar</h2>
              {state.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-xl shadow hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center space-x-5 w-full md:w-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain rounded-lg border border-gray-100"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.qty} × ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <button
                      onClick={() => removeItem(item)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition duration-200"
                      disabled={item.qty === 1}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="px-3 text-lg font-semibold">{item.qty}</span>
                    <button
                      onClick={() => addItem(item)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition duration-200"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-20 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Buyurtma Tafsilotlari</h2>
              <ul className="space-y-4 text-gray-700 text-sm">
                <li className="flex justify-between">
                  <span>Maxsulotlar ({totalItems} dona):</span>
                  <span>${subtotal.toLocaleString()}</span>
                </li>
                
                <li className="flex justify-between font-bold border-t pt-3 text-base">
                  <span>Umumiy:</span>
                  <span>${(subtotal + shipping).toLocaleString()}</span>
                </li>
              </ul>
              <Link
                to="/checkout"
                className="mt-6 block w-full text-center py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
              >
                Zakazni rasmiylashtirish
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8"> Savat</h1>
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );  
};

export default Cart;
