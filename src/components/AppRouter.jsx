import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import { routes } from "../router/router";

const AppRouter = () => {
    return (
        //  Позволяет группировать маршруты
        <Switch>
          {routes.map(route => 
            <Route 
                  component={route.component} 
                  path={route.path} 
                  exact={route.exact}
            />
          )}
          <Redirect to='/posts'/>
        </Switch>
    )
}

export default AppRouter;