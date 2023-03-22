import {configureStore} from '@reduxjs/toolkit'
import userStateSlice from "./userStateSlice";
import deviceStateSlice from "./deviceStateSlice";
import {useDispatch} from "react-redux";


const index = configureStore({
    reducer: {
        devices: deviceStateSlice,
        users: userStateSlice,
    },
})

export type RootState = ReturnType<typeof index.getState>
export type AppStore = ReturnType<typeof index.getState>
export type AppDispatch = typeof index.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch


export default index;

