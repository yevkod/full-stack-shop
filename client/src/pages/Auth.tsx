import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Card, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {setUser, setIsAuth} from "../store/userStateSlice";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RootState} from "../store";
import {useAppDispatch} from "../hooks/useAppDispatch";


const Auth:React.FC = () => {
    const user = useTypedSelector((state:RootState) => state.users)
    const dispatch = useAppDispatch();
    console.log("AUTH", user)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const click = async () => {
        try {
            let data:any;

            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            dispatch(setUser(user))
            dispatch(setIsAuth(true))
            navigate(SHOP_ROUTE)
        } catch (e:any) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>Нет аккаунта?
                                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт?
                                <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;
