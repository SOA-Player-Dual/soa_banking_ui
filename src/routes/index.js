import Home from '@/pages/Home';
import Login from '@/pages/Auth/Login/';
import OTP from '@/pages/Auth/OTP/';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    { path: '/otp', component: OTP },
];

export default routes;
