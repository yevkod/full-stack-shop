import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RootState} from "../store";


export const AppRouter:React.FC = () => {
    const user = useTypedSelector((state:RootState) => state.users);
    console.log("AppRouter", user)


    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route element={<Navigate to={SHOP_ROUTE}/>} />
        </Routes>
    );
};


