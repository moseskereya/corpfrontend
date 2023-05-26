import axios from "axios";
import { Navigate } from "react-router-dom";
const axiosClient = axios.create({
  baseURL: "https://lazy-puce-fossa-belt.cyclic.app/api"
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
     window.location.reload();
  } else if (response.status === 404) {
      <Navigate to="/notfound"/>
  }

  throw error;
})

export default axiosClient
