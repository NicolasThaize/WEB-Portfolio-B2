import axios from "axios";
import { UserContext } from "./context";
const contextType = UserContext;

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("nthaize_access_token")
      ? "JWT " + localStorage.getItem("nthaize_access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops early
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("nthaize_refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem(
                "nthaize_access_token",
                response.data.access
              );
              localStorage.setItem(
                "nthaize_refresh_token",
                response.data.refresh
              );

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch(() => {
              contextType.logoutUser();
            });
        } else {
          window.location.href = "/login/"; // Refresh token expired
        }
      } else {
        window.location.href = "/login/"; // Refresh token not available
      }
    }

    // specific error handling done elsewhere

    return Promise.reject(JSON.parse(error.request.response));
  }
);

export default axiosInstance;
