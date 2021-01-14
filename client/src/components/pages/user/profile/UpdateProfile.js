import React, { useEffect, useState } from "react";
import { updateProfile } from "../../../../utils/Profile";
import ErrorMessages from "../../../inc/ErrorMessages";
export default function UpdateProfile() {
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [About, setAbout] = useState();
  const [Skills, setSkills] = useState();
  const [error, setError] = useState();
  const submit = async (e) => {
    e.preventDefault();
    const userDeet = { Name, Email, About, Skills };
    try {
      const updatingPro = await updateProfile(userDeet);
    } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <>
      <div className="page">
        <h2>Hello this is a profile update page</h2>
        { error && (<ErrorMessages message = {error} clearError={()=> setError(undefined)} />)} 
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group">
            <label>About</label>
            <textarea
              type="text"
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              onChange={(e) => {
                setSkills(e.target.value);
              }}
            ></input>
          </div>
          <input type="submit"></input>
        </form>
      </div>
    </>
  );
}
