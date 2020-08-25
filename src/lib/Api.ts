import axios from 'axios';
const baseURL = process.env.REACT_APP_APIURL;

const API = axios.create({
  baseURL,
  timeout: 40000,
});
export default API;

