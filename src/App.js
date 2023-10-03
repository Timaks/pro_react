import React, { useEffect, useState } from "react";
import './styles/App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Error from "./pages/Error";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";


function App() {
  const [isAuth, setIsAuth] = useState(false);
//закончился ли запрос на сервер
  const [isLoading, setLoading] = useState(true);
//проверка на авторизованность (localStorage получаем авторизован ли пользователь)
  useEffect(() => {
      if(localStorage.getItem('auth')){
        setIsAuth(true)
      }
      setLoading(false);
  }, [])
    return (
      <AuthContext.Provider value={{
        isAuth, 
        setIsAuth,
        isLoading
      }}>
        <BrowserRouter> 
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
      
      )
}

export default App;
