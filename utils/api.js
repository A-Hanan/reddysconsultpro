import axios from "axios";

// http://localhost:5000/api
//https://consultproapi.herokuapp.com/api
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://consultproapi.herokuapp.com/api",
  // baseURL: process.env.BASE_API_URL || "http://localhost:5000/api",
});
// if (localStorage.token) {
//   api.defaults.headers.common["auth-token"] = localStorage.getItem("token");
// }

export default api;
