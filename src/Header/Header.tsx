import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAppDispath, useAppSelector } from "../store";

export const Header = () => {
    const dispath = useAppDispath();

    const order = useAppSelector((state) => state.orderR.order);
    const userInfo = useAppSelector((state) => state.tokenR.user);

    useEffect(() => {
    }, [dispath, userInfo.username, order.username])

    return (
        <div className="head">
            <div className="cart">
                <Link 
                    to="/user/cart"
                >
                    Корзина{order.count !== 0 ? '(' + order.count.toString() + ')' : ''}
                </Link>
            </div>
            <div className="log_in">
                {userInfo.access === "" ? 
                    <Link
                        to="/login"
                    >
                        Log In
                    </Link>
                :
                    <Link
                        to="/userpage"
                    >
                        {userInfo.username}
                    </Link>
                }
            </div>
        </div>
    )
}