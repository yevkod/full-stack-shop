import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    isAuth: any,
    user: any,
}

const initialState: UserState = {
    isAuth: false,
    user: {},
}

export const userStateSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setIsAuth: (state, action:PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action:PayloadAction<any>) => {
            state.user = action.payload
        },
    },
    extraReducers: {}
})

export const {setIsAuth, setUser} = userStateSlice.actions;
export default userStateSlice.reducer;