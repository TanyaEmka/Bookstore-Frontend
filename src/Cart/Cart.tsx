import React from "react";
import "./Cart.css";
import { useState, useEffect } from "react";
import { useAppDispath, useAppSelector } from "../store";
import { changeloading } from "../store/actions/loadingAction";
import { BookInCartProps, CartsBooksProps } from "../Book/BookTypes";
import { BookInCart } from "../BookInCart/BookInCart";
import { Loading } from "../Loading/Loading";
import { changeOrder } from "../store/actions/orderActions";
import { useNavigate } from "react-router-dom";

export const Cart: React.FC = () => {

    const dispath = useAppDispath();
    const navigate = useNavigate();

    const loading = useAppSelector((state) => state.loadingR.loading);
    const [cartData, setCartData] = useState<Array<CartsBooksProps>>([]);
    const [price, setPrice] = useState(0);
    const cartState = useAppSelector((state) => state.cartR.cart);
    const order = useAppSelector((state) => state.orderR.order);
    const userInfo = useAppSelector((state) => state.tokenR.user)
    const orderInfo = useAppSelector((state) => state.orderR.order)
    const requestOptions = {
        method: "get",
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + userInfo.access,
        },
    }

    const getCart = () => {
        dispath(changeloading(true));
        if (order.count !== 0 && userInfo.username !== "") {
            fetch('/ordergoods/?username=' + orderInfo.username + '&status=N', requestOptions)
            .then((response) => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("No element in order");
            })
            .then((data: Array<CartsBooksProps>) => {
                setPrice((prev) => 0);
                data.map((element: CartsBooksProps, index: number) => {
                    fetch('/bookincart/' + element.book_id.toString() + '/', requestOptions)
                    .then((response) => {
                        
                        return response.json()
                    })
                    .then((dataB: BookInCartProps) => {
                        data[index].price = dataB.price
                        setPrice((prev) => prev + dataB.price * element.count)
                    })
                })
                setCartData(data);
            })
            .catch((error) => {
                setCartData([]);
            })
        }
    }

    const createEmptyOrder = () => {
        let today = new Date().toISOString().slice(0, 19);
        fetch('/orders/', {
            method: "put",
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            },
            body: JSON.stringify({
                ...order,
                count: 0, 
            })
        })
    }

    const paidOrder = () => {
        if (order.count !== 0 && userInfo.username !== "")
        {
            createEmptyOrder();
            let today = new Date().toISOString().slice(0, 19);
            fetch('/orders/', {
                method: "post",
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + userInfo.access,
                },
                body: JSON.stringify({
                    ...order,
                    p_date: today,
                    status: 'L',  
                })
            })
            .then((response) => {console.log(response)})
            setCartData([])
            dispath(changeOrder({...order, count: 0}))
        }
    }

    const getOrderPrice = () => {
        return cartData.reduce((sum: number, elem: CartsBooksProps) => {return sum + elem.price * elem.count}, 0)
    }

    const getOrderCount = () => {
        return cartData.reduce((sum: number, elem: CartsBooksProps) => {return sum + elem.count}, 0)
    }

    useEffect(() => {
        if (userInfo.username === "")
            navigate('/login')
        else {
            getCart();
            dispath(changeloading(false));
        }
    }, [orderInfo.username, userInfo.username, orderInfo.count, orderInfo.status])

    useEffect(() => {
        const index = cartData.findIndex((element) => element.id === cartState.id)
        setCartData([...cartData.slice(0, index), ...cartData.slice(index + 1)]);
    }, [cartState, dispath, userInfo.username, orderInfo.username])

    return (
        <div>
            {loading ? <Loading /> :
            <div className="cart_page">
                <div className="cart_title">Корзина{
                    order.count === 0 ? "" : 
                    "(" + getOrderCount().toString() + ") - " + getOrderPrice().toString() + " Р"
                }</div>
                <div className="books_in_cart">
                    {order.count !== 0 ? cartData.map((element: CartsBooksProps, item: number) => {
                        return (
                            <BookInCart good={element} idInCart={element.id} key={item} />
                        )
                    }) : "В корзине нет товаров"}
                </div>
                {userInfo.username !== "" && order.count !== 0 ?
                    <div className="paid_button" onClick={paidOrder}>Оплатить</div>
                    : ""
                }
            </div>
            }
        </div>
    )
}