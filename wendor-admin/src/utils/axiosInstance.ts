import axios from "axios";

export const baseURL = "http://localhost:8080/api/v1";
// export const baseURL = "https://wendor-server.prathamdev.site/api/v1";

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export const logoutApi = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});



// Request interceptor for Bearer Auth
axiosInstance.interceptors.request.use(
    (config) => {
        if (config.headers['Authorization']) {
            config.headers['Authorization'] = null;
        }
        const token = localStorage.getItem('token');
        config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
