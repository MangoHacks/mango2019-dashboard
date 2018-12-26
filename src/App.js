import React from "react";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import { DefaultRoute, DashboardRoute, AddPropsToRoute } from "./routes";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import HTTP404 from "./components/HTTP404";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <DefaultRoute
            exact
            path="/"
            component={() => <Redirect to="login" />}
          />
          <DefaultRoute exact path="/login" component={Login} />

          <DashboardRoute
            exact
            path="/dashboard"
            component={AddPropsToRoute(Dashboard)}
          />

          <Route component={HTTP404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
