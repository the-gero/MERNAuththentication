import Api from "../Api";
import ErrorMessages from "../components/inc/ErrorMessages";

var test = undefined;
var user ;
export const isLoggedIn = () => {
  Api()
    .post("/users/tokenIsValid")
    .then((res) => {
      test= res.data
    });
    return test;
    // return "Hellow";
};
export const getUser = () => {
  Api()
    .get("/users/")
    .then((res) => {
      user= res.data;
      // console.log(res.data.displayName)
      // console.log(typeof res.data)
    });
    //console.log(user,'user')
    return user;
};
