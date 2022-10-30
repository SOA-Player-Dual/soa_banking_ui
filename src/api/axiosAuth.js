import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL_LOGIN,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Credentials': true,
    },
    responseType: 'json',
});

// Add a request interceptor
axiosAuth.interceptors.request.use(
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
axiosAuth.interceptors.response.use(
    function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // return Promise.reject(error);
        NProgress.done();
        return error && error.response && error.response.data
            ? error.response.data
            : Promise.reject(error);
    }
);

export default axiosAuth;
