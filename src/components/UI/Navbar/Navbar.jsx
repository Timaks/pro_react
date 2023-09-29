import React from "react";
import {Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="navbar">
        <div className="navbar__links">
          {/* Используем линк чтобы не было перезагрузки на страницах */}
          <Link to="/about">О сайте</Link>
          <Link to="/posts">Посты</Link>
        </div>
      </div>
    )
}

export default Navbar;