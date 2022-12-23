import React from "react";
import "./EditPage.css";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { useParams, Link } from "react-router-dom";
import { useAppDispath, useAppSelector } from "../store";
import { AuthorProps, BookElementProps, PublisherProps, SeriesProps, StatusProps, SubGenreProps } from "../Book/BookTypes";
import { changeId } from "../store/actions/idActions";
import { changeBook } from "../store/actions/bookActions";
import { changeStatus } from "../store/actions/statusActions";

export const EditPage: React.FC = () => {

    const dispath = useAppDispath();

    const {id} = useParams();
    const idInPage = useAppSelector((state) => state.idR.id)
    const book: BookElementProps = useAppSelector((state) => state.bookR.book);
    const [editBook, setEditBook] = useState<BookElementProps>(book);
    const [editStatus, setEditStatus] = useState("no changes");
    const [seriesIs, setSeriesIs] = useState(book.series_is)

    const status: StatusProps = useAppSelector((state) => state.statusR.status);
    const [stringBookStatuses, setStringBookStatuses] = useState<Array<{value: string, label: string}>>([]);
    const [selectedStatus, setSelectedStatus] = useState({value: status.id.toString(), label: status.name});

    const subgenre: SubGenreProps = useAppSelector((state) => state.subgenreR.subgenre)
    const [stringGenres, setStringGenres] = useState<Array<{value: string, label: string}>>([]);
    const [selectedGenre, setSelectedGenre] = useState({value: book.subgenre_id.toString(), label: subgenre.name});

    const author: AuthorProps = useAppSelector((state) => state.authorR.author)
    const [stringAuthors, setStringAuthors] = useState<Array<{value: string, label: string}>>([]);
    const [selectedAuthor, setSelectedAuthor] = useState({value: book.author_id.toString(), label: author.name});

    const publisher: PublisherProps = useAppSelector((state) => state.publisherR.publisher)
    const [stringPublishers, setStringPublishers] = useState<Array<{value: string, label: string}>>([]);
    const [selectedPublisher, setSelectedPublisher] = useState({value: book.publisher_id.toString(), label: publisher.name});

    const series: SeriesProps = useAppSelector((state) => state.seriesR.series)
    const [stringSerieses, setStringSerieses] = useState<Array<{value: string, label: string}>>([]);
    const [selectedSeries, setSelectedSeries] = useState({value: book.series_id.toString(), label: series.name});

    const username = useAppSelector((state) => state.tokenR.user.username);
    const is_staff = useAppSelector((state) => state.userR.user.is_staff);
    const token = useAppSelector((state) => state.tokenR.user.access);

    const handleTypeStatus = (e: any) => {
        setSelectedStatus(e.value)
        editBook.status_id = parseInt(e.value);
        setEditBook({...editBook})
    }

    const handleTypeSubGenre = (e: any) => {
        setSelectedGenre(e.value)
        editBook.subgenre_id = parseInt(e.value)
        setEditBook({...editBook})
    }

    const handleTypeAuthor = (e: any) => {
        setSelectedAuthor(e.value)
        editBook.author_id = parseInt(e.value)
        setEditBook({...editBook})
    }

    const handleTypePublisher = (e: any) => {
        setSelectedPublisher(e.value)
        editBook.publisher_id = parseInt(e.value)
        setEditBook({...editBook})
        getSerieses();
    }

    const handleTypeSeries = (e: any) => {
        setSelectedSeries(e.value)
        editBook.series_id = parseInt(e.value)
        setEditBook({...editBook})
    }

    const getStatuses = () => {
        fetch('/statuses/')
        .then((response) => {
            return response.json()
        })
        .then((data: Array<StatusProps>) => {
            let statuses: Array<{value: string, label: string}> = [];
            data.map((element: StatusProps, index: number) => {
                statuses.push({value: element.id.toString(), label: element.name})
            })
            setStringBookStatuses([...statuses])
        })
    }

    const getSubGenres = () => {
        fetch('/subgenres/')
        .then((response) => {
            return response.json()
        })
        .then((data: Array<SubGenreProps>) => {
            let subgenres: Array<{value: string, label: string}> = [];
            data.map((element: SubGenreProps, index: number) => {
                subgenres.push({value: element.id.toString(), label: element.name})
            })
            setStringGenres([...subgenres])
        })
    }

    const getAuthors = () => {
        fetch('/authors/')
        .then((response) => {
            return response.json()
        })
        .then((data: Array<AuthorProps>) => {
            let authors: Array<{value: string, label: string}> = [];
            data.map((element: AuthorProps, index: number) => {
                authors.push({value: element.id.toString(), label: element.name})
            })
            setStringAuthors([...authors])
        })
    }

    const getPublishers = () => {
        fetch('/publishers/')
        .then((response) => {
            return response.json()
        })
        .then((data: Array<PublisherProps>) => {
            let publishers: Array<{value: string, label: string}> = [];
            data.map((element: PublisherProps, index: number) => {
                publishers.push({value: element.id.toString(), label: element.name})
            })
            setStringPublishers([...publishers])
        })
    }

    const getSerieses = () => {
        fetch('/series/?publisher_id=' + editBook.publisher_id.toString())
        .then((response) => {
            return response.json()
        })
        .then((data: Array<SeriesProps>) => {
            let series: Array<{value: string, label: string}> = [];
            data.map((element: SeriesProps, index: number) => {
                series.push({value: element.id.toString(), label: element.name})
            })
            setStringSerieses([...series])
        })
    }

    const changeApi = () => {
        let methodName = "put"
        if (id === "0")
            methodName = "post"
        putOrAddBook(methodName)
    }

    const putOrAddBook = (methodName: string) => {
        setEditStatus("no changes")
        let needBook = {...editBook}
        if (id === "0"){
            let {id: _, ...rest} = needBook
        }
        let needRequestString = id === "0" ? "" : id + '/';
        fetch('/books/' + needRequestString, 
        {
            method: methodName,
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify({...needBook})
        })
        .then((response) => {
            console.log(response);
            if (response.ok)
            {
                setEditStatus("ok")
                dispath(changeBook({...editBook}))
            }
            else
                throw new Error("wrong data")
        })
        .catch((error) => {
            if (error.toString() === "Error: wrong data")
                setEditStatus("wrong data")
        })
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.title = e.target.value
        setEditBook({...editBook})
    }

    const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.price = parseInt(e.target.value === "" ? "0" : e.target.value)
        setEditBook({...editBook})
    }

    const changeISBN = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.ISBN = e.target.value
        setEditBook({...editBook})
    }

    const changeEISBN = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.eISBN = e.target.value
        setEditBook({...editBook})
    }

    const changeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.count = parseInt(e.target.value === "" ? "0" : e.target.value)
        setEditBook({...editBook})
    }

    const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.publish_year = parseInt(e.target.value === "" ? "0" : e.target.value)
        setEditBook({...editBook})
    }

    const changeAgeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.age_limit = parseInt(e.target.value === "" ? "0" : e.target.value)
        setEditBook({...editBook})
    }

    const changeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.language = e.target.value
        setEditBook({...editBook})
    }

    const changePageCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.page_count = parseInt(e.target.value === "" ? "0" : e.target.value)
        setEditBook({...editBook})
    }

    const changeSeriesIs = (e: React.ChangeEvent<HTMLInputElement>) => {
        editBook.series_is = parseInt(e.target.value === "" ? "0" : (stringSerieses.length !== 0 ? "1" : "0"))
        setSeriesIs(editBook.series_is)
        setEditBook({...editBook})
    }

    useEffect(() => {
        setEditBook(book);
        setEditStatus("no changes")
        getStatuses();
        getAuthors();
        getPublishers();
        getSubGenres();
        getSerieses();
        if (id != idInPage)
            dispath(changeId(id ? id : "1"))
    }, [dispath])

    return (
        <div>
            {username !== "" && is_staff ? 
                <div className="edit_page">
                    <div className="header">
                        {id === "0" ? "Добавление" : "Редактирование"}
                    </div>
                    {editStatus === "no changes" ? 
                        <div></div>
                        :
                        editStatus === "ok" ?
                            <div className="ok">Изменения успешно внесены</div> 
                        :
                        editStatus === "wrong data" ?
                            <div className="wrong_data">Формат данных некорректен</div> 
                        :
                        <div></div>
                    }
                    <div className="main_parameters">
                        {id === "0" ? "" :
                            <div className="edit_input">
                                <div className="title">ID: </div>
                                <div className="info">{id}</div>
                            </div>
                        }
                        <div className="edit_input">
                            <div className="title">Название: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.title}
                                    onChange={changeTitle}
                                    placeholder="Название"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Цена: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.price.toString()}
                                    onChange={changePrice}
                                    placeholder="Цена"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">ISBN: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.ISBN}
                                    onChange={changeISBN}
                                    placeholder="ISBN"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">електронный ISBN: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.eISBN}
                                    onChange={changeEISBN}
                                    placeholder="Электронный ISBN"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Количество: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.count.toString()}
                                    onChange={changeCount}
                                    placeholder="Количество"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Год издания: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.publish_year.toString()}
                                    onChange={changeYear}
                                    placeholder="Количество"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Возрастное ограничение: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.age_limit.toString()}
                                    onChange={changeAgeLimit}
                                    placeholder="Количество"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Язык: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.language}
                                    onChange={changeLanguage}
                                    placeholder="Количество"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Количество страниц: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.page_count.toString()}
                                    onChange={changePageCount}
                                    placeholder="Количество страниц"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Наличие серии: </div>
                            <div className="info">
                                <input 
                                    type="text"
                                    value={editBook.series_is.toString()}
                                    onChange={changeSeriesIs}
                                    placeholder="Наличие серии"
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Статус: </div>
                            <div className="info">
                                <Select
                                    defaultValue={selectedStatus}
                                    onChange={handleTypeStatus}
                                    options={stringBookStatuses}
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Жанр: </div>
                            <div className="info">
                                <Select
                                    defaultValue={selectedGenre}
                                    onChange={handleTypeSubGenre}
                                    options={stringGenres}
                                    isSearchable={true}
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Автор: </div>
                            <div className="info">
                                <Select
                                    defaultValue={selectedAuthor}
                                    onChange={handleTypeAuthor}
                                    options={stringAuthors}
                                    isSearchable={true}
                                />
                            </div>
                        </div>
                        <div className="edit_input">
                            <div className="title">Издательство: </div>
                            <div className="info">
                                <Select
                                    defaultValue={selectedPublisher}
                                    onChange={handleTypePublisher}
                                    options={stringPublishers}
                                    isSearchable={true}
                                />
                            </div>
                        </div>
                        {seriesIs ? 
                            <div className="edit_input">
                                <div className="title">Серия: </div>
                                <div className="info">
                                    <Select
                                        defaultValue={selectedSeries}
                                        onChange={handleTypeSeries}
                                        options={stringSerieses}
                                        isSearchable={true}
                                    />
                                </div>
                            </div> :
                            <div></div>
                        }
                    </div>
                    <div className="edit_button" onClick={changeApi}>
                        {id === "0" ? "Добавить" : "Изменить"}
                    </div>
                </div>
                :
                <div className="auth_error">
                    Ошибка: вы не зарегестрированы или не администратор
                </div>
            }
        </div>
    )
}