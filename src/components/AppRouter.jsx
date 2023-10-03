import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import { publicRoutes, privateRoutes } from "../router";
import { useContext } from "react";
import { AuthContext } from "../context";


const AppRouter = () => {
      const {isAuth} = useContext(AuthContext)
      console.log(isAuth);
      return(
            isAuth
           ?
               //  Позволяет группировать маршруты
            <Switch>
            {privateRoutes.map(route => 
                  <Route 
                        component={route.component} 
                        path={route.path} 
                        exact={route.exact}
                        key={route.path}
                  />
            )}
            <Redirect to='/posts'/>
            </Switch>
            :
            <Switch>
                  {publicRoutes.map(route => 
                  <Route 
                        component={route.component} 
                        path={route.path} 
                        exact={route.exact}
                        key={route.path}
                  />
            )}
            <Redirect to='/login'/>
            </Switch> 
      )
}

export default AppRouter;