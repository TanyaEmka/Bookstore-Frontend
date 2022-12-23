import React, { useEffect } from "react";
import "./Book.css";
import add from "../images/add.svg";
import bookimg from "../images/bookimg.svg";
import { useState } from "react";
import { ShortBookProps } from "./BookTypes";
import { Link, Outlet } from 'react-router-dom';
import { changeId } from "../store/actions/idActions";
import { changeOrder } from "../store/actions/orderActions";
import { useAppDispath, useAppSelector } from "../store";
import { CartsBooksProps } from "./BookTypes";
import { OrderProps } from "./BookTypes";
import { StatusProps } from "./BookTypes";

export const Book: React.FC<ShortBookProps> = ( {book} ) => {
    const dispath = useAppDispath();

    const order = useAppSelector((state) => state.orderR.order);
    const userInfo = useAppSelector((state) => state.tokenR.user);

    const addInAPI = () => {
        const requestOptions = {
            method: 'post',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            },
            body: JSON.stringify({
                user_id: 1,
                username: order.username,
                order_id: order.id,
                book_id: book.id,
                count: 1,
                price: book.price,
                p_date: new Date("1000-01-01T00:00:00"),
                status: 'N',
            })
        }

        fetch('/ordergoods/', requestOptions)
        .then((response) => {
            return response.json()
        })
        .then((data) => {})    
    }

    const putInApi = (data: Array<CartsBooksProps>) => {
        fetch('/ordergoods/' + data[0].id.toString() + '/', {
            method: 'put',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            },
            body: JSON.stringify({
                user_id: data[0].user_id,
                username: data[0].username,
                order_id: data[0].order_id,
                book_id: data[0].book_id,
                count: data[0].count + 1,
                price: data[0].price,
                p_date: data[0].p_date,
                status: data[0].status,
            })
        })
    }

    const ChangeCountOfOrder = () => {
        fetch('/orders/?status=N&username=' + order.username, 
        {
            method: 'get',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data: Array<OrderProps>) => {
            fetch('/orders/' + data[0].id + '/',
            {
                method: 'put',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + userInfo.access,
                },
                body: JSON.stringify({
                    id: data[0].id,
                    user_id: data[0].user_id,
                    username: data[0].username,
                    count: data[0].count + 1,
                    price: data[0].price + book.price,
                    p_date: new Date(data[0].p_date),
                    status: data[0].status
                })
            })
        })
        dispath(changeOrder({
            id: order.id,
            user_id: order.user_id,
            username: order.username,
            count: order.count + 1,
            price: order.price + book.price,
            p_date: order.p_date,
            status: order.status
        }));
    }

    const addElement = () => {
        fetch('/ordergoods/?status=N&book_id=' + book.id.toString() + '&username=' + order.username, 
        {
            method: 'get',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            }
        })
        .then((response) => {
            if (response.ok)
                return response.json()
            else if (response.statusText !== "Unauthorized")
                throw new Error("there is no need book")
            else
                throw new Error("no auth")
        })
        .then((data: Array<CartsBooksProps>) => {
            if (data.length !== 0)
                putInApi(data);
            else
                addInAPI();  
            ChangeCountOfOrder();
        })
        .catch((error) => {
            if (error.toString() === 'Error: there is no need book')
            {
                addInAPI();
                ChangeCountOfOrder();
            }
        })
    }

    return (
        <div className="book">
            <div className="book_img">
                <Link
                    to={"/books/" + book.id.toString()}
                    key={book.id}
                    onClick={() => dispath(changeId(book.id.toString()))}
                >
                    <img src={bookimg} alt="img" />
                </Link>
                {book.status === "На складе" ?
                    <div 
                        className="add"
                        onClick={addElement}
                    >
                        <img src={add} alt="img" />
                    </div>
                : ""
                }
            </div>
            <div className="info">
                <div className="price">{(book.price === 0) ? "Бесплатно" : ((book.price).toString() + " Р")}</div>
                <div className="title">
                    <Link
                        to={"/books/" + book.id.toString()}
                        key={book.id.toString()}
                        onClick={() => dispath(changeId(book.id.toString()))}
                    >
                        {book.title}
                    </Link>
                </div>
                <div className="author">{book.author}</div>
            </div>
            <Outlet />
        </div>
    )
}