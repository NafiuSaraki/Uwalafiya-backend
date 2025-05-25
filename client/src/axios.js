// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Make sure it's pointing to backend
  withCredentials: false,
});

export default instance;