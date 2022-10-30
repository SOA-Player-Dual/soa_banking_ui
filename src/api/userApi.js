import axios from '@/api/axiosAuth';

const Login = (username, password) => {
    return axios.post('v1/auth/login', { username, password });
};

export { Login };
