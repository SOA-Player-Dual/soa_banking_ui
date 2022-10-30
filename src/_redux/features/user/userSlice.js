import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: { fullname: '', email: '', phone: '', surplus: '' },
        isLogin: false,
    },

    reducers: {
        login: (state, action) => {
            console.log('login action', action);
            state.user = {
                fullname: action?.payload?.fullname,
                email: action?.payload?.email,
                phone: action?.payload?.phone,
                surplus: action?.payload?.surplus,
            };

            //     user: {
            //         fullname: action?.payload?.data?.fullname;
            //         email: action?.payload?.data?.email;
            //         phone: action?.payload?.data?.phone;
            //         surplus: action?.payload?.data?.surplus;
            //     }
            state.isLogin = true;
        },
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
