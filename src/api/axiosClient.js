import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        NProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        NProgress.done();
        return error && error.response && error.response.data
            ? error.response.data
            : Promise.reject(error);
    }
);

export default axiosClient;
