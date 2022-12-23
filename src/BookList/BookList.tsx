import React, { useEffect, useState } from "react";
import "./BookList.css";
import { BookElementProps, ShortBookElementProps, AuthorProps, StatusProps } from "../Book/BookTypes";
import { Book } from "../Book/Book";
import { changeloading } from "../store/actions/loadingAction";
import { useAppDispath, useAppSelector } from "../store";
import { ThreeDots } from "react-loader-spinner";
import { Loading } from "../Loading/Loading";

export const BookList: React.FC = () => {

    const dispath = useAppDispath();

    const loading = useAppSelector((state) => state.loadingR.loading);
    const search = useAppSelector((state) => state.searchR.search);
    const bookPageId = useAppSelector((state) => state.idR.id)

    const [books, setBooks] = useState<Array<BookElementProps>>([]);
    const [authors, setAuthors] = useState<Array<AuthorProps>>([]);
    const [statuses, setStatuses] = useState<Array<StatusProps>>([]);

    const getStatuses = () => {
        fetch('/statuses/')
        .then((response) => {
            return response.json()
        })
        .then((data: Array<StatusProps>) => {
            setStatuses([...data])
        })
    }

    const getStatusName = (statusId: number) => {
        let name = "";
        if (statuses.length !== 0)
            name = statuses.filter((object) => { return object.id === statusId })[0].name
        if (name)
            return name
        else
            return ""
    }

    useEffect(() => {
        dispath(changeloading(true));
        fetch('/books/?search=' + search.name + '&min_price=' + search.min_price + '&max_price=' + search.max_price + '&status_id=' + search.status_id.toString())
        .then ((response) => {
            return response.json()
        })
        .then ((data: Array<BookElementProps>) => {
            setBooks([...data])
        })

        fetch('/authors/')
        .then ((response) => {
            return response.json()
        })
        .then ((dataA: Array<AuthorProps>) => {
            dispath(changeloading(false));
            setAuthors([...dataA])
        })
        getStatuses();
    }, [search, dispath, bookPageId]);


    return (
        <div>
            {loading ? <Loading /> :
            <div className="book_list">
                {books.map((book: BookElementProps, item: number) => {
                    let authorInd = authors.find((element) => element.id === book.author_id)?.name
                    let authorName = ""
                    if (authorInd)
                        authorName = authorInd
                    let nBook: ShortBookElementProps = {
                        id: book.id,
                        title: book.title,
                        author: authorName,
                        price: book.price,
                        status: getStatusName(book.status_id)
                    }
                    return (
                        <Book book={nBook} key={item}/>
                    )
                })}
            </div>
            }
        </div>
    )
}