import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./components/AppRouter";
import Navbar from './components/NavBar'
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {RootState} from "./store";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {setIsAuth, setUser} from "./store/userStateSlice";


export const App = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        check().then((data:any) => {
            dispatch(setUser(true))
            dispatch(setIsAuth(true))
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    )
}

