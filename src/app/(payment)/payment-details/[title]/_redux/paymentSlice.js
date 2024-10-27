import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: "payment", 
    initialState: {
        loading: false, 
        paymentDetail: '',

    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setPaymentDetails(state, action) {
            state.paymentDetail = action.payload;
        },

    }
});

export const {
    setLoading,
    setPaymentDetails,

} = paymentSlice.actions;

export default paymentSlice.reducer;