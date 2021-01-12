import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const services = () => history.push("/services");
  const about = () => history.push("/about");
  const logout = () => {
      setUserData({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("auth-token","");
      window.location.reload()
  } ;

  return (
    <nav className="auth-options">
      {userData.user ? (
        <>
        <button onClick={about}>About</button>
        <button onClick={services}>Services</button>
        <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
}
