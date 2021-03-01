import React, { useEffect, useState } from "react";
import { updateProfile, getProfile } from "../../../../utils/Profile";
import ErrorMessages from "../../../inc/ErrorMessages";
export default function UpdateProfile() {
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [About, setAbout] = useState();
  const [Skills, setSkills] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const setFetchedData = async () => {
      const fetched = await getProfile().then((res) => {
        setEmail(res.data.user.email);
        setName(res.data.user.displayName);
        setSkills(res.data.user.skills);
        setAbout(res.data.user.about);
        return res.data.user;
      });
    };
    if (Name == null) {
      setFetchedData();
    }
  });
  const submit = async (e) => {
    e.preventDefault();
    const userDeet = { Name, Email, About, Skills };
    try {
      const updatingPro = await updateProfile(userDeet);
      console.log(updatingPro)
      if (updatingPro.status == 200) {
        console.log('tomato')
        window.location.replace("/");

      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <>
      <div className="page">
        <h2>Hello this is a profile update page</h2>
        {error && (
          <ErrorMessages
            message={error}
            clearError={() => setError(undefined)}
          />
        )}
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group">
            <label>About</label>
            <textarea
              type="text"
              placeholder={About}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              placeholder={Skills}
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
