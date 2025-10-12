import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="demo" element={<Demo />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="update/:token" element={<Update />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
