import React from "react";
import { Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    const isLoggedIn = localStorage.getItem("token_test");

    return isLoggedIn ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

export default ProtectedRoute;
