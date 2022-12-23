import React from "react";
import { useState } from "react";
import { TokenJWTProps } from "../Book/BookTypes";
import { useAppDispath } from "../store";
import { changeToken } from "../store/actions/tokenActions";
import { changeOrder } from "../store/actions/orderActions";
import { OrderProps } from "../Book/BookTypes";
import { Link } from "react-router-dom";
import { changeloading } from "../store/actions/loadingAction";
import { UserProps } from "../Book/BookTypes";
import { changeUser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import "./Authorization.css";

const initialState: OrderProps = {
    id: 1,
    user_id: 1,
    username: "",
    count: 0,
    price: 1,
    p_date: "1000-01-01 00:00:00",
    status: 'N'
}

export const Authorization: React.FC = () => {

    const dispath = useAppDispath();
    const navigate = useNavigate()

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [order, setOrder] = useState<OrderProps>(initialState);
    const [errorM, setErrorM] = useState("no errors");

    const getUser = () => {
        fetch('/userinfo/?username=' + userName)
        .then((response) => {
            return response.json()
        })
        .then((data: Array<UserProps>) => {
            dispath(changeloading(false))
            dispath(changeUser({...data[0]}))
        })
        .catch((error) => {})
    }

    const logIn = () => {
        fetch('/auth/jwt/create/',
        {
            method: 'post',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        })
        .then((response) => {
            if (response.ok)
                return response.json()
            else
                throw new Error("There is no need user")
        })
        .then((data: TokenJWTProps) => {
            setErrorM("no errors")
            dispath(changeloading(true));
            fetch('/orders/?username=' + userName + '&status=N', 
            { 
                method: 'get', 
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + data.access, 
                }
            })
            .then((response) => {
                if (response.statusText === "Unauthorized" && !response.ok)
                throw new Error("no auth")
                return response.json()
            })
            .then((dataOrder: Array<OrderProps>) => {
                setOrder({
                    ...dataOrder[0],
                    user_id: 1,
                    p_date: dataOrder[0].p_date.toString(),
                });
            })
            .catch((error) => {
            })
            dispath(changeToken({username: userName, refresh: data.refresh, access: data.access}));
            dispath(changeOrder({...order}));
            getUser();
            navigate("/userpage")
        })
        .catch((error) => {
            if (error.toString() === "Error: There is no need user")
            {
                setErrorM("error login")
                setPassword("");
            }
        })
    }

    const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <div className="auth_form">
            <div className="username">
                <input
                    type="text"
                    placeholder="Логин"
                    value={userName}
                    onChange={changeUserName}
                />
            </div>
            <div className="password">
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={changePassword}
                />
            </div>
            {errorM === "error login" ?
                <div className="error">Логин или пароль введены неверно. Повторите попытку снова</div>
                :
                <div></div>
            }
            <div
                className="auth_button"
                onClick={logIn}
            >
                Войти
            </div>
            <Link
                to="/registration"
            >
                <div className="reg_title">
                    Регистрация
                </div>
            </Link>
        </div>
    )
}