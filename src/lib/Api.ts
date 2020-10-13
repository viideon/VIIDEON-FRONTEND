import axios from "axios";
const baseURL = process.env.REACT_APP_APIURL;

const API = axios.create({
  // baseURL,
  baseURL: "http://192.168.18.8:3008",
  timeout: 40000
});
export default API;
