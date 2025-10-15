import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Base from "./components/layouts/Base";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Portfolio from "./components/pages/Portfolio";
import Demo from "./components/pages/Demo";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import ResetPassword from "./components/pages/auth/Reset";
import Update from "./components/pages/auth/Update";
import Dashboard from "./components/pages/auth/Dashboard";
import { Bounce, ToastContainer } from 'react-toastify';
import { FaroRoute } from '@grafana/faro-react';
const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Routes>
        <FaroRoute path="/" element={<Base />}>
          <FaroRoute index element={<Home />} />
          <FaroRoute path="about" element={<About />} />
          <FaroRoute path="portfolio" element={<Portfolio />} />
          <FaroRoute path="demo" element={<Demo />} />
          <FaroRoute path="contact" element={<Contact />} />
          <FaroRoute path="login" element={<Login />} />
          <FaroRoute path="register" element={<Register />} />
          <FaroRoute path="reset" element={<ResetPassword />} />
          <FaroRoute path="update/:token" element={<Update />} />
          <FaroRoute path="*" element={<NotFound />} />
        </FaroRoute>
        <FaroRoute path="dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
