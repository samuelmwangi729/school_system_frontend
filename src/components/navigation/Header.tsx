import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from '../../assets/images/logo.png'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser, selectUserDetails } from "../../redux/userSlice";
import persistStore from "redux-persist/es/persistStore";
import store from "../../redux/store";
const Header: React.FC = () => {
  const user = useAppSelector(selectUserDetails)
  const dispatch = useAppDispatch()
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? "text-white bg-[#8071F2] px-4 py-2 rounded-lg shadow-md transition-all duration-300"
      : "text-gray-600 hover:text-[#8071F2] hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-300";

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const Logout = async (): Promise<void> => {
    persistStore(store).purge() // clears persisted state
    dispatch(logoutUser())
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Use relative so the dropdown stays inside header background */}
      <nav className="relative flex items-center justify-between mx-auto px-2 md:px-6 py-3">
        <div>
          <NavLink
            to="/"
            className="text-[#8071F2] font-extrabold text-xl md:text-2xl lg:text-4xl tracking-tight hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <img src={Logo} alt="Scholarvio Logo" />
          </NavLink>
        </div>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-6 font-medium text-lg">
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className={navLinkClass}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/demo" className={navLinkClass}>
              Demo
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
          {user?.loggedIn ? (
            <>
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  My Account
                </NavLink>
              </li>
              <li>
                <button
                  onClick={Logout}
                  className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8071F2] hover:text-white transition-all duration-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8071F2] hover:text-white transition-all duration-300">
                  Register
                </NavLink>
              </li>
            </>
          )}

        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-3xl text-[#8071F2] focus:outline-none"
          onClick={handleMenuToggle}
          aria-label="Toggle menu">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 transition-all duration-300 md:hidden">
            <ul className="flex flex-col items-center gap-4 py-4 font-medium text-lg">
              <li>
                <NavLink
                  to="/about"
                  className={navLinkClass}
                  onClick={closeMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/portfolio"
                  className={navLinkClass}
                  onClick={closeMenu}>
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/demo"
                  className={navLinkClass}
                  onClick={closeMenu}>
                  Demo
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={navLinkClass}
                  onClick={closeMenu}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={closeMenu}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8071F2] hover:text-white transition-all duration-300"
                  onClick={closeMenu}>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
