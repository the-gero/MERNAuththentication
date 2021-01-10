import Api from "../Api";

var test;
var user ;
export const isLoggedIn = async () => {
  await Api()
    .post("/users/tokenIsValid")
    .then((res) => {
      test= res.data
    });
    return test;
};
export const getUser = async () => {
  await Api()
    .get("/users/")
    .then((res) => {
      user= res.data;
      // console.log(res.data.displayName)
      // console.log(typeof res.data)
    });
    //console.log(user,'user')
    return user;
};
