import React,{useState,useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/Auth";

const Public = ({ component: Component, restricted, ...rest }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const value = await isLoggedIn()
    setIsAuthed(value)
    setLoading(false)
  }, [])
  console.log(isAuthed)
  return (
    loading?
    <p>Loading...</p>
    :
    <Route
      {...rest}
      render={(props) =>
        isAuthed && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default Public;
