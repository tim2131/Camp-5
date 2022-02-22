import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/App.css";

import Navbar from "./components/Navbar";
// import Home from "./pages/home";
// import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import PaymentForGoods from "./components/PaymentForGoods";
import ShipmentCreditCard from "./components/ShipmentCreditCard";
import ShipmentConvenienceStore from "./components/ShipmentConvenienceStore";
import OrderSuccess from "./components/OrderSuccess";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route path="/" exact element={<Home />} /> */}
            {/* <Route path="/products" element={<Products />} /> */}
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/p_orders/cart" element={<ShoppingCart />} />
            <Route path="/p_orders/payment" element={<PaymentForGoods />} />
            <Route
              path="/p_orders/shipment/credit_card"
              element={<ShipmentCreditCard />}
            />
            <Route
              path="/p_orders/shipment/convenience_store"
              element={<ShipmentConvenienceStore />}
            />
            <Route path="/p_orders/success" element={<OrderSuccess />} />
          </Routes>
          <Footer />
          <ProductDetail />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
