import React from "react";
import { Route, Redirect } from "react-router-dom";

const DefaultRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("JWT");

  const requestedRoute = (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );

  return token ? <Redirect to="dashboard" /> : requestedRoute;
};

const DashboardRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("JWT");

  const dashboard = (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );

  return token ? dashboard : <Redirect to="login" />;
};

const CarnivalRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("CARNIVAL_JWT");

  const dashboard = (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );

  return token ? dashboard : <Redirect to="carnival" />;
};

const ExpressRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("EXPRESS_JWT");

  const dashboard = (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );

  return token ? dashboard : <Redirect to="express" />;
};

const GERoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("GE_JWT");

  const dashboard = (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );

  return token ? dashboard : <Redirect to="ge" />;
};

const AddPropsToRoute = (WrappedComponent, passedProps) => {
  return class Route extends React.Component {
    render() {
      const props = Object.assign({}, this.props, passedProps);
      return <WrappedComponent {...props} />;
    }
  };
};

export {
  DefaultRoute,
  DashboardRoute,
  AddPropsToRoute,
  CarnivalRoute,
  ExpressRoute,
  GERoute
};
