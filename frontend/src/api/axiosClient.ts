import axios from "axios";
//Axios: promise-based JavaScript libary used to perform HTTP requests to backend API

//Connecting to the backend URL, converts data into JSON format.
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//Runs before every request made with AxiosClient. Interceptor checks localStorage for 'auth', then adds the JWT to the request header.
//JWT is automatically added to header. If not, every protected request would need to maunally set the token in the headers.
axiosClient.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      const auth = JSON.parse(storedAuth);

      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;