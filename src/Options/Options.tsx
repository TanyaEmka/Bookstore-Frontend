import React from "react";
import "./Options.css"
import { Link, Outlet } from 'react-router-dom';

export const Options: React.FC = () => {
    return (
        <div className="options">
            <div className="option">
                <Link to="/">
                    Главная
                </Link>
            </div>
            <div className="option">
                <Link to="/best">
                    Лучшее
                </Link>
            </div>
            <div className="option">
                <Link to="/new">
                    Новинки
                </Link>
            </div>
            <div className="option">
                <Link to="/authors">
                    Авторы
                </Link>
            </div>
            <div className="option">
                <Link to="/publishers">
                    Издания
                </Link>
            </div>
            <div className="option">
                <Link to="/series">
                    Серии
                </Link>
            </div>
            <Outlet />
        </div>
    )
}