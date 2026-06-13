import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Asset/Logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Calculator", to: "/calculator" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-white/95 backdrop-blur-sm border-b border-gray-100"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5">
          <img src={Logo} alt="Velora Milk" className="w-10 h-10 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-gray-900 tracking-tight">Velora</span>
            <span className="text-[10px] text-blue-700 font-medium tracking-widest uppercase">Milk</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-blue-800 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/20"
          >
            Get in Touch
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-blue-800 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 px-4 py-3 text-center text-sm font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-700 transition"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
