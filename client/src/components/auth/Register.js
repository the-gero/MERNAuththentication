import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessages from "../inc/ErrorMessages";
import { logIn, register } from '../../utils/Auth'

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();

  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await register(newUser);
      const loginRes = await logIn( {
        email,
        password,
      });
      setUserData({
        token: loginRes.token,
        user: loginRes.user,
      });
      localStorage.setItem("auth-token", loginRes.token);
      history.push("/");
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      { error && (<ErrorMessages message = {error} clearError={()=> setError(undefined)} />)}
      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-passwordCheck">Confirm Password</label>
          <input
            id="register-passwordCheck"
            type="password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-displayName">Display Name</label>
          <br />
          <input
            id="register-displayName"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
