import { createSlice } from '@reduxjs/toolkit';

const tuitionSlice = createSlice({
    name: 'tuition',
    initialState: {
        tuition_data: {
            full_name: '',
            student_id: '',
            tuition_fee: '',
            tuition_status: '',
        },
        isNull: true,
    },

    reducers: {
        setTuitionData: (state, action) => {
            state.tuition_data = {
                full_name: action?.payload?.full_name,
                student_id: action?.payload?.student_id,
                tuition_fee: action?.payload?.tuition_fee,
                tuition_status: action?.payload?.tuition_status,
            };
            state.isNull = false;
        },
        resetTuitionData: (state) => {
            state.tuition_data = {
                full_name: '',
                student_id: '',
                tuition_fee: '',
                tuition_status: '',
            };
            state.isNull = true;
        },
    },
});

export const { setTuitionData, resetTuitionData } = tuitionSlice.actions;
export default tuitionSlice.reducer;
