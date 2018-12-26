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

const AddPropsToRoute = (WrappedComponent, passedProps) => {
  return class Route extends React.Component {
    render() {
      const props = Object.assign({}, this.props, passedProps);
      return <WrappedComponent {...props} />;
    }
  };
};

export { DefaultRoute, DashboardRoute, AddPropsToRoute };
