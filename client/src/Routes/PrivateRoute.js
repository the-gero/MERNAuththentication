import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLogin = async () => {
      const value = await isLoggedIn();
      setIsAuthed(value);
      setLoading(false);
    };
    getLogin();
  }, []);
  return loading ? (
    <p>Loading...</p>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        isAuthed ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
