import Api from "../Api";

export const register = async (registerUser) => {
  const { data } = await Api().post("/users/register", registerUser);
  console.log(data)
  return data;
};
export const logIn = async (logInUser) => {
  const { data } = await Api().post("/users/login", logInUser);
  console.log(data)
  return data;
};
export const isLoggedIn = async () => {
  const { data } = await Api().post("/users/tokenIsValid");
  return data;
};
export const getUser = async () => {
  const { data } = await Api().get("/users/");
  return data;
};
