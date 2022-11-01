import axios from '@/api/axiosClient';

const getTuitionById = (student_id) => {
    return axios.get(`v1/account/tuition/${student_id}`);
    // return axios.get(`/get-tuition?student_id=${student_id}`);
};

const sendOTP = (id, student_id) => {
    return axios.post(`v1/account/otp`, { userID: id, mssv: student_id });
};

const verifyOTP = (id, otp) => {
    return axios.put(`v1/account/otp`, { userID: id, otp: otp });
};

const getNewSurplus = (userID) => {
    return axios.get(`v1/account/surplus/${userID}`);
};

export { getTuitionById, sendOTP, verifyOTP, getNewSurplus };
