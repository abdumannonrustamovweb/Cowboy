import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  Home,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  ProductDetail,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode >
    <BrowserRouter>
      <ScrollToTop>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/product/*" element={<PageNotFound />} />
          </Routes>
        </Provider>
      </ScrollToTop>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
