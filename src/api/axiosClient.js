import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json',
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    function (config) {
        NProgress.start();

        // console.log('Log config:', config);

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        // console.log(response.acessToken);
        NProgress.done();

        console.log('Log response:', response.data);

        // return response.data;
        return response && response.data ? response.data : response;
    },
    function (error) {
        NProgress.done();

        // refresh token

        // return Promise.reject(error);
        return error && error.response && error.response.data
            ? error.response.data
            : Promise.reject(error);
    }
);

export default axiosClient;
