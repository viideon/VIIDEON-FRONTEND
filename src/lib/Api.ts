import axios from 'axios';

const baseURL = process.env.REACT_APP_APIURL;

const API = axios.create({
  baseURL,
  timeout: 6000,
});

export default API;

