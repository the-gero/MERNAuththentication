import Axios from "axios";

let BaseApi = Axios.create({
  baseURL: "http://localhost:5000",
});

let Api = function () {
  let token = localStorage.getItem("auth-token");
  if (token === null) {
    localStorage.setItem("auth-token", "");
    token = "";
  }

  if (token) {
    BaseApi.defaults.headers.common["x-auth-token"] = token;
  }

  return BaseApi;
};
export default Api;
