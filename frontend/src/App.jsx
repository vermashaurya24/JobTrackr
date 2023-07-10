import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
