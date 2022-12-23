import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookPage.css";
import { BookElementProps, RatingProps, StatusProps, AuthorProps, 
    SubGenreProps, PublisherProps, SeriesProps, CartsBooksProps } from "../Book/BookTypes";
import { Rating } from "../Rating/Rating";
import bookimg from "../images/bookimg.svg";
import { useAppDispath, useAppSelector } from "../store";
import { changeBook } from "../store/actions/bookActions";
import { changeAuthor } from "../store/actions/authorActions";
import { changeRating } from "../store/actions/ratingActions";
import { changeStatus } from "../store/actions/statusActions";
import { changePublisher } from "../store/actions/publisherActions";
import { changeSubGenre } from "../store/actions/subgenreActions";
import { changeSeries } from "../store/actions/seriesActions";
import { changeloading } from "../store/actions/loadingAction";

import { changeOrder } from "../store/actions/orderActions";
import { changeId } from "../store/actions/idActions";
import { OrderProps } from "../Book/BookTypes";
import { Loading } from "../Loading/Loading";


export const BookPage: React.FC = () => {

    const dispath = useAppDispath();

    const {id} = useParams();
    const idInPage = useAppSelector((state) => state.idR.id)
    const book: BookElementProps = useAppSelector((state) => state.bookR.book);
    const rating: RatingProps = useAppSelector((state) => state.ratingR.rating);
    const status: StatusProps = useAppSelector((state) => state.statusR.status);
    const author: AuthorProps = useAppSelector((state) => state.authorR.author);
    const publisher: PublisherProps = useAppSelector((state) => state.publisherR.publisher);
    const subgenre: SubGenreProps = useAppSelector((state) => state.subgenreR.subgenre);
    const series: SeriesProps = useAppSelector((state) => state.seriesR.series);

    const loading = useAppSelector((state) => state.loadingR.loading);

    const order = useAppSelector((state) => state.orderR.order);
    const userInfo = useAppSelector((state) => state.tokenR.user)
    const is_staff = useAppSelector((state) => state.userR.user.is_staff)

    const changeIdInPage = () => {
        if (id !== idInPage)
            dispath(changeId(id ? id : "1"))
    }

    const deleteBook = () => {
        fetch('/books/' + id + '/', {
            method: 'delete',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userInfo.access,
            },
        })
        .then((response) => {
            dispath(changeId("0"))
        })
    }

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
            body: JSON.stringify({...data[0]})
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
        if (status?.name === "На складе") {
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
    }

    useEffect(() => {
        changeIdInPage();
    }, [])

    useEffect(() => {
        dispath(changeloading(true));
        fetch('/books/' + id + '/')
        .then((response) => {
            return response.json()
        })
        .then((data: BookElementProps) => {
            dispath(changeBook({...data}));

            fetch('/ratings/' + data.rating_id + '/')
            .then((response) => {
                return response.json()
            })
            .then((dataR: RatingProps) => {
                dispath(changeRating({...dataR}));
            })

            fetch('/statuses/' + data.status_id + '/')
            .then((response) => {
                return response.json()
            })
            .then((dataS: StatusProps) => {
                dispath(changeStatus({...dataS}));
            })

            fetch('/authors/' + data.author_id + '/')
            .then((response) => {
                return response.json()
            })
            .then((dataA: AuthorProps) => {
                dispath(changeAuthor({...dataA}));
            })

            fetch('/subgenres/' + data.subgenre_id + '/')
            .then((response) => {
                return response.json()
            })
            .then((dataS: SubGenreProps) => {
                dispath(changeSubGenre({...dataS}));
            })

            fetch('/publishers/' + data.publisher_id + '/')
            .then((response) => {
                return response.json()
            })
            .then((dataP: PublisherProps) => {
                dispath(changePublisher({...dataP}));
            })

            fetch('/series/' + data.series_id + '/')
            .then((response) => {
                return response.json()
            })
            .then((dataS: SeriesProps) => {
                dispath(changeloading(false));
                dispath(changeSeries({...dataS}));
            })
        })
    }, [dispath, idInPage])

    return (
        <div>
            {loading ? <Loading /> 
            :
            <div className="book_page">
                <div className="book_img">
                    <img src={bookimg} alt="img" />
                </div>
                <div className="book_info">
                    <div className="book_header">
                        <div className="title">
                            {author?.name}:&nbsp;&nbsp;&nbsp;{book?.title}
                        </div>
                        <div className="status">
                            {status?.name}
                        </div>
                        <div className="age_limit">
                            {book?.age_limit}+
                        </div>
                        {is_staff && userInfo.username !== "" ? 
                            <div className="buttons">
                                <Link
                                    to = {"/editbook/" + id}
                                >
                                    <div className="edit" onClick={changeIdInPage}>
                                        Редактировать
                                    </div>
                                </Link>
                                <Link
                                    to = {"/"}
                                >
                                    <div className="delete" onClick={deleteBook}>
                                        Удалить
                                    </div>
                                </Link>
                            </div>
                            :
                            ""
                        }
                    </div>
                    <div className="book_body">
                        <div className="main_block">
                            <div className="block_elem">
                                <Rating value={rating ? rating?.value : 0} count={rating ? rating?.count : 0} />
                            </div>
                            <div className="block_elem">
                                <div className="price">{book?.price} Р</div>
                            </div>
                            <div 
                                className="block_elem"
                                onClick={addElement}
                            >
                                <div className="cart">В корзину</div>
                            </div>
                        </div>
                        <div className="second_block">
                            <div className="top">
                                <p>Автор: {author?.name}</p>
                                <p>Издательство: {publisher?.name}, {book?.publish_year}</p>
                                {book?.series_is === 1 ? <p>Серия: {series?.name}</p> : ''}
                                <p>Жанр: {subgenre?.name}</p>
                            </div>
                            <div className="bottom">
                                <p>ID: {book?.id}</p>
                                <p>ISBN: {book?.ISBN}{book?.eISBN === '' ? '' : ', ' + book?.eISBN}{book?.series_is === 0 ? '' : ', ' + series?.ISBN + '(серия)'}</p>
                                <p>Страницы: {book?.page_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}