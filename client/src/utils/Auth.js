import Api from "../Api";


export const isLoggedIn = async () => {
  const { data } = await Api().post("/users/tokenIsValid");
  return data;
};
export const getUser = async () => {
  const { data } = await Api().get("/users/");
  return data;
};
