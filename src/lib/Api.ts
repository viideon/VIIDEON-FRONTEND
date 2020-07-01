import axios from 'axios';
const baseURL = process.env.REACT_APP_APIURL;
// const baseURL = process.env.REACT_APP_DEVAPI;

const API = axios.create({
  baseURL,
  timeout: 30000,
});
export default API;

