import axios from "axios";

const token = localStorage.getItem("admintoken");

const defaultAxios = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default defaultAxios;
