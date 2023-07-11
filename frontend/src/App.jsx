import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/authentication/AuthenticationPage";
import Home from "./pages/home/home.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/home/:username" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
