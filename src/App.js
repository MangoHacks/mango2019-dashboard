import React from "react";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import {
  DefaultRoute,
  DashboardRoute,
  AddPropsToRoute,
  CarnivalRoute,
  ExpressRoute,
  GERoute
} from "./routes";

// Default
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Company Login
import CarnivalLogin from "./components/Companies/Login/Carnival";
import ExpressLogin from "./components/Companies/Login/Express";
import GELogin from "./components/Companies/Login/GE";

// Company Dashboard
import CarnivalDashboard from "./components/Companies/Dashboard/Carnival";
import ExpressDashboard from "./components/Companies/Dashboard/Express";
import GEDashboard from "./components/Companies/Dashboard/GE";

import HTTP404 from "./components/HTTP404";
import Checkin from "./components/Checkin";
import Hacker from "./components/Hacker";
import HackerResponse from "./components/HackerResponse";

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
            path="/checkin"
            component={AddPropsToRoute(Checkin)}
          />

          <Route exact path="/hacker" component={Hacker} />
          <Route exact path="/hackerresponse" component={HackerResponse} />

          {/* Companies Login*/}
          <DefaultRoute exact path="/carnival" component={CarnivalLogin} />
          <DefaultRoute exact path="/express" component={ExpressLogin} />
          <DefaultRoute exact path="/ge" component={GELogin} />

          {/* Companies Dashboard*/}
          <CarnivalRoute
            exact
            path="/carnival-dashboard"
            component={AddPropsToRoute(CarnivalDashboard)}
          />
          <ExpressRoute
            exact
            path="/express-dashboard"
            component={AddPropsToRoute(ExpressDashboard)}
          />
          <GERoute
            exact
            path="/ge-dashboard"
            component={AddPropsToRoute(GEDashboard)}
          />

          <Route component={HTTP404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
