import React, { useEffect } from "react";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useAppDispath, useAppSelector } from "../store";
import { changeToken } from "../store/actions/tokenActions";
import { changeOrder } from "../store/actions/orderActions";
import { changeUser } from "../store/actions/userActions";
import "./UserPage.css";
import { Link } from "react-router-dom";
import { changeBook } from "../store/actions/bookActions";
import { bookInitialState } from "../store/initialState";

export const UserPage: React.FC = () => {

    const dispath = useAppDispath()

    const user = useAppSelector((state) => state.userR.user);
    const loading = useAppSelector((state) => state.loadingR.loading)
    const order = useAppSelector((state) => state.orderR.order)

    const logOut = () => {
        dispath(changeToken({username: "", refresh: "", access: ""}));
        dispath(changeOrder(
            {
                id: 1,
                user_id: 1,
                username: "",
                count: 0,
                price: 1,
                p_date: "1000-01-01 00:00:00",
                status: 'N'
            }))
        dispath(changeUser(
            {
                id: 0, 
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                is_staff: false
            }
        ))
    }

    const getNullBook = () => {
        let today = new Date();
        let year = today.getFullYear();
        dispath(changeBook({
            id: 1,
            title: "",
            author_id: 0,
            publisher_id: 1,
            subgenre_id: 1,
            series_id: 1,
            rating_id: 1,
            status_id: 1,
            price: 0,
            page_count: 0,
            language: "russian",
            publish_year: year,
            sale: 0,
            age_limit: 6,
            ISBN: "",
            eISBN: "",
            series_is: 0,
            count: 0,
        }))
    }

    return (
        <div>
            {loading ? <Loading /> :
                    <div className="userpage">
                        <div className="user_fullname">
                            {user.first_name} {user.last_name} {user.is_staff ? <div className="admin">Admin</div> : ''}
                        </div>
                        <div className="user_email">
                            {user.username}: {user.email}
                        </div>
                        <div className="buttons">
                            {user.is_staff ?
                                <div>
                                    <Link
                                        to="/editbook/0"
                                    >
                                        <div className="add_book" onClick={getNullBook}>
                                            Добавить книгу
                                        </div>
                                </Link>
                                </div>
                            : ""}
                            <div>
                                <Link
                                    to="/login"
                                >
                                    <div className="log_out" onClick={logOut}>
                                        Выйти
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    }
        </div>
    )
}