import React, { useState } from "react";
import "./Registration.css";
import { useAppDispath } from "../store";
import { UserProps } from "../Book/BookTypes";
import { TokenJWTProps } from "../Book/BookTypes";
import { OrderProps } from "../Book/BookTypes";
import { changeOrder } from "../store/actions/orderActions";
import { changeToken } from "../store/actions/tokenActions";
import { changeUser } from "../store/actions/userActions";
import { changeloading } from "../store/actions/loadingAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const initialState: UserProps = {
    id: 0,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_staff: false
}

const orderInitialState: OrderProps = {
    id: 1,
    user_id: 1,
    username: "",
    count: 0,
    price: 0,
    p_date: "1000-01-01 00:00:00",
    status: 'N'
}

export const Registration: React.FC = () => {

    const dispath = useAppDispath();
    const navigate = useNavigate();

    const [editUser, setEditUser] = useState<UserProps>(initialState);
    const [copyPassword, setCopyPassword] = useState("");
    const [password, setPassword] = useState("");

    const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({...editUser, username: e.target.value})
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({...editUser, email: e.target.value})
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const changeCopyPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCopyPassword(e.target.value)
    }

    const getToken = () => {
        fetch('/auth/jwt/create/',
        {
            method: 'post',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                username: editUser.username,
                password: password
            })
        })
        .then((responseUser) => {
            return responseUser.json()
        })
        .then((data: TokenJWTProps) => {
            fetch('/orders/', 
            { 
                method: 'post', 
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + data.access, 
                },
                body: JSON.stringify({
                    ...orderInitialState,
                    username: editUser.username
                })
            })
            .then((response) => {
                console.log(response)
            })
            dispath(changeToken({username: editUser.username, refresh: data.refresh, access: data.access}));
            dispath(changeOrder({...orderInitialState, username: editUser.username}));
            dispath(changeUser({...editUser}))
            dispath(changeloading(false));
            navigate('/userpage')
        })
    }

    const createUser = () => {
        dispath(changeloading(true))
        fetch('/auth/users/', 
        { 
            method: 'post', 
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: editUser.email,
                username: editUser.username,
                password: password,
            })
        })
        .then((response) => {
            console.log(response)
            if (response.ok) {
                getToken()
            }
        })
    }

    const onRegClick = (e: any) => {
        createUser();
    }

    return (
        <div className="registration">
            <div className="main_title">Регистрация</div>
            <div className="title">Логин</div>
            <div className="reg_input">
                <input 
                    type="text"
                    placeholder="Логин"
                    value={editUser.username}
                    onChange={changeLogin}
                />
            </div>
            <div className="title">Почта</div>
            <div className="reg_input">
                <input 
                    type="text"
                    placeholder="Почта"
                    value={editUser.email}
                    onChange={changeEmail}
                />
            </div>
            <div className="pass_field">
                <div className="title">
                    Введите пароль:
                </div>
                <div className="reg_input">
                    <input 
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={changePassword}
                    />
                </div>
                <div className="reg_input">
                    <input 
                        type="password"
                        placeholder="Повторите пароль"
                        value={copyPassword}
                        onChange={changeCopyPassword}
                    />
                </div>
            </div>
            <div className="reg_button" onClick={onRegClick}>
                Регистрация
            </div>
        </div>
    )
}