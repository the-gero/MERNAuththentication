import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch /*  Route  */ } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import About from "./components/pages/About";
import UserProfile from "./components/pages/user/profile/UpdateProfile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import { isLoggedIn, getUser } from "../src/utils/Auth";
import "./style.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await isLoggedIn();
      console.log(tokenRes,"tokenRes")
      if (tokenRes) {
        const userRes = await getUser();
        setUserData({
          token,
          user: userRes,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <PublicRoute restricted={false} component={Home} path="/" exact />
              <PublicRoute
                restricted={true}
                component={Login}
                path="/login"
                exact
              />
              <PublicRoute
                restricted={true}
                component={Register}
                path="/register"
                exact
              />
              <PrivateRoute component={Services} path="/services" exact />
              <PrivateRoute component={About} path="/about" exact />
              <PrivateRoute component={UserProfile} path="/profile" exact />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
