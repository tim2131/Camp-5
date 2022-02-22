import React from 'react';
import Navbar from './components/navbar/navbar';
import Home from './pages/home'
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login"

function App() {
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
