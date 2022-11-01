import axios from '@/api/axiosClient';

const Login = (username, password) => {
    return axios.post('v1/auth/login', { username, password });
};

const Logout = () => {
    return axios.post('v1/auth/logout');
};

const refreshToken = () => {
    return axios.post('v1/auth/refresh');
};

export { Login, Logout, refreshToken };
