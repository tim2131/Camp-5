import React from 'react';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";



function App() {
  return (
    <>
      <Navbar />
      {/* <ProductDetail /> */}
      <ShoppingCart />
      <Footer />
    </>
  );
}

export default App;
