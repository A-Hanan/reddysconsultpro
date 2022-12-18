import axios from "axios";

// http://localhost:5000/api
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://consultproapi.herokuapp.com/api",
  // baseURL: process.env.BASE_API_URL || "http://localhost:5000/api",
});
// if (localStorage.token) {
//   api.defaults.headers.common["auth-token"] = localStorage.getItem("token");
// }

export default api;
