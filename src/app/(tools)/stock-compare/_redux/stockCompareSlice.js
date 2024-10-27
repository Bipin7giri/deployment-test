import { createSlice } from "@reduxjs/toolkit";

const companyCompareSlice = createSlice({
    name: "companyCompare",
    initialState: {
        loading: false,
        companyCompare: [],
        companyBySector: [],
        comapanyRecentQuater: '',
        companyLineChartData: [],

    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setCompanyCompare(state, action) {
            state.companyCompare = action.payload;
        },
        setCompanyBySector(state, action) {
            state.companyBySector = action.payload;
        },
        setCompanyRecentQuater(state, action){
            state.comapanyRecentQuater = action.payload;
        },
        setCompanyLineChartData(state, action){
            state.companyLineChartData = action.payload;
        },

    }
});

export const {
    setLoading,
    setCompanyCompare,
    setCompanyBySector,
    setCompanyRecentQuater,
    setCompanyLineChartData,
    

} = companyCompareSlice.actions;

export default companyCompareSlice.reducer;