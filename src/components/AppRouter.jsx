import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";

const AppRouter = () => {
    return (
        //  Позволяет группировать маршруты
        <Switch>
          <Route path="/about">
                <About/>
          </Route>
          <Route exact path="/posts">
                <Posts/>
          </Route>
          {/* Динамический маршрут :id (делает разницу в словах posts exact)*/}
          <Route exact path="/posts/:id">
                <PostIdPage/>
          </Route>
          <Route path="/error">
                <Error/>
          </Route>
          <Redirect to='/posts'/>
        </Switch>
    )
}

export default AppRouter;