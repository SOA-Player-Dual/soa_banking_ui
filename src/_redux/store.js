import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/_redux/features/counter/counterSlice';
import userReducer from '@/_redux/features/user/userSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
});

export default store;
