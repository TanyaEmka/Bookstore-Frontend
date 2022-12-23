import React from "react";
import { useEffect, useState } from "react";
import { BookElementProps, AuthorProps } from "../Book/BookTypes";
import { useAppDispath, useAppSelector } from "../store";
import { changeCart } from "../store/actions/cartActions";
import { CartsBooksProps } from "../Book/BookTypes";
import { changeOrder } from "../store/actions/orderActions";
import "./BookInCart.css";
import bookimg from "../images/bookimg.svg";
import { Link } from "react-router-dom";

export type BookInCartProps = {
    good: CartsBooksProps,
    idInCart: number
}

export const BookInCart: React.FC<BookInCartProps> = ({good, idInCart}) => {

    const dispath = useAppDispath();

    const [book, setBook] = useState<BookElementProps>();
    const cartState = useAppSelector((state) => state.cartR.cart);
    const [author, setAuthor] = useState<AuthorProps>();
    const [count, setCount] = useState(good.count);
    const order = useAppSelector((state) => state.orderR.order);
    const userInfo = useAppSelector((state) => state.tokenR.user)

    const deleteBook = () => {
        fetch('/ordergoods/' + idInCart.toString() + '/', 
        { 
            method: 'delete',
            mode: "cors",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            },
        })
        .then((response) => {  })
        dispath(changeCart({change: cartState.change === 1 ? 0 : 1, id: idInCart}))
    }

    const putBook = () => {
        fetch('/ordergoods/' + good.id.toString() + '/', 
        { 
            method: 'put',
            mode: "cors", 
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            },
            body: JSON.stringify(good) 
        })
    }

    const putOrder = (newCount: number, newPrice: number) => {
        fetch('/orders/' + order.id.toString() + '/',
        { 
            method: 'put', 
            mode: "cors",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access, 
            },
            body: JSON.stringify({
                id: order.id,
                user_id: order.user_id,
                username: order.username,
                count: newCount,
                price: newPrice,
                p_date: new Date(order.p_date),
                status: order.status,
            }) 
        })
    }

    const changeAllOrder = (newCount: number, newPrice: number) => {
        putOrder(newCount, newPrice);
        dispath(changeOrder({
            ...order,
            count: newCount,
            price: newPrice,
        }));
    }

    const IncCount = (e: any) => {
        let newCount = (count === 100) ? count : count + 1;
        let newOrderCount = (count === 100) ? order.count : order.count + 1;
        let newOrderPrice = (count === 100) ? order.price : order.price + (book ? book.price : 0);
        setCount(newCount);
        good.count = newCount;
        changeAllOrder(newOrderCount, newOrderPrice);
        putBook();
    }

    const DecCount = (e: any) => {
        let newCount = count;
        let newOrderCount = (order.count >= 1) ? order.count - 1 : 0;
        let newOrderPrice = (order.count >= 1) ? order.price - (book ? book.price : 0) : 0;
        if (newOrderPrice < 0)
            newOrderPrice = 0;
        if (newCount <= 1)
        {
            newCount = 1;
            deleteBook();
            changeAllOrder(newOrderCount, newOrderPrice);
        }
        else
        {
            newCount -= 1;
            good.count = newCount;
            changeAllOrder(newOrderCount, newOrderPrice);
            putBook();
        }
        setCount(newCount);
    }

    useEffect(() => {
        fetch('/books/' + good.book_id.toString() + '/',
        { 
            method: 'get', 
            mode: 'cors',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access, 
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data: BookElementProps) => {

            setBook(data);

            fetch('/authors/' + data.author_id.toString() + '/',
            { 
                method: 'get', 
                mode: "cors",
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + userInfo.access, 
                }
            })
            .then((response) => {
                return response.json()
            })
            .then((dataA: AuthorProps) => {
                setAuthor(dataA)
            })
        })
    }, [good.book_id])

    return (
        <div className="book_in_cart">
            <div className="bc_img">
                <Link
                    to={"/books/" + good.book_id.toString()}
                    key={good.book_id.toString()}
                >
                    <img src={bookimg} alt="img" />
                </Link>
            </div>
            <div className="bc_count">
                <span className="bc_value">{count}</span>
                <span className="bc_dec" onClick={DecCount}>-</span>
                <span className="bc_inc" onClick={IncCount}>+</span>
            </div>
            <div className="bc_info">
                <div className="price">{book?.price === 0 ? 'бесплатно' : book?.price.toString() + ' P'}</div>
                <div className="title">{book?.title}</div>
                <div className="author">{author?.name}</div>
            </div>
        </div>
    )
}