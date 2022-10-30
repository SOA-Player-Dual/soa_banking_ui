import axios from '@/api/axiosClient';

const getTuitionById = (student_id) => {
    return axios.get(`get-tuition?student_id=${student_id}`);
};

export { getTuitionById };
