import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Container from "react-bootstrap/Container";
import {useNavigate}  from "react-router-dom"
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setUser, setIsAuth} from "../store/userStateSlice";
import {RootState} from "../store";
import {useAppDispatch} from "../hooks/useAppDispatch";



const NavBar:React.FC = () => {
    const user = useTypedSelector((state:RootState) => state.users);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    console.log("NavBar", user)


    const logOut = () => {
        dispatch(setUser({}))
        dispatch(setIsAuth(false))
    }

    return (
        <>
        <Navbar  style={{backgroundColor: "#000000"}} variant="light">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Shop Online</NavLink>
                {user.isAuth ?
                    <Nav style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                        <Button variant={"outline-light"} onClick={() => logOut()} className="ml-2">Выйти</Button>
                    </Nav>
                    :
                    <Nav variant="outline-success" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
        </>
    );
};

export default NavBar;
