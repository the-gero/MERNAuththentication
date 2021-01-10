import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/Auth";

const Public = ({ component: Component, restricted, ...rest }) => {
  console.log(isLoggedIn())
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default Public;
