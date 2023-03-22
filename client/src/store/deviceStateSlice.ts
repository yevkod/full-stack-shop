import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DeviceState {
    types: any,
    brands: any,
    devices: any,
    selectedType: any,
    selectedBrand: any,
    page: any,
    totalCount: any,
    limit: any,
}

const initialState: DeviceState = {
    types: [],
    brands: [],
    devices: [],
    selectedType: {},
    selectedBrand: {},
    page: 1,
    totalCount: 0,
    limit: 3,
}

export const deviceStateSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        setTypes: (state, action:PayloadAction<any>) => {
            state.types = action.payload;
        },
        setBrands: (state, action:PayloadAction<any>) => {
            state.brands = action.payload;
        },
        setDevices: (state, action:PayloadAction<any>) => {
            state.devices = action.payload;
        },
        setSelectedType: (state, action: PayloadAction<any>) => {
            state.selectedType = action.payload;
        },
        setSelectedBrand: (state, action:PayloadAction<any>) => {
            state.selectedBrand = action.payload;
        },
        setPage: (state, action:PayloadAction<any>) => {
            state.page = action.payload;
        },
        setTotalCount: (state, action:PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        limit: (state, action:PayloadAction<any>) => {
            state.limit = action.payload;
        },
    },
    extraReducers: {},
});

export const {setTypes, setBrands, setDevices, setSelectedType, setSelectedBrand, setPage, setTotalCount, limit} = deviceStateSlice.actions;
export default deviceStateSlice.reducer;
