import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3200", // Replace with your backend URL
  withCredentials: true, // For Passport.js sessions
});

export default api;
