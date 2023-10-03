import React from "react";
import { useContext } from "react";
import {Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
// удаляем запись из localStorage когда выходим из своего аккаунта
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth')
  }

    return (
        <div className="navbar">
          <MyButton onClick={logout}>
            Выйти
          </MyButton>
        <div className="navbar__links">
          {/* Используем линк чтобы не было перезагрузки на страницах */}
          <Link to="/about">О сайте</Link>
          <Link to="/posts">Посты</Link>
        </div>
      </div>
    )
}

export default Navbar;