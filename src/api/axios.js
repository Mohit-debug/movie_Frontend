import axios from 'axios';
// import.meta.env

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

instance.interceptors.request.use(
  config => {
    return Promise.resolve(config);
  },
  error => Promise.reject(error)
);
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  }
);
export default instance;
