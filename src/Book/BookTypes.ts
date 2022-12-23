export type BookElementProps = {
    id: number,
    title: string,
    author_id: number,
    publisher_id: number,
    subgenre_id: number,
    series_id: number,
    rating_id: number,
    status_id: number,
    price: number,
    page_count: number,
    language: string,
    publish_year: number,
    sale: number,
    age_limit: number,
    ISBN: string,
    eISBN: string,
    series_is: number,
    count: number,
}

export type ShortBookElementProps = {
    id: number,
    title: string, 
    author: string,
    price: number,
    status: string,
}

export type BookProps = {
    book: BookElementProps,
}

export type ShortBookProps = {
    book: ShortBookElementProps,
}

export type AuthorProps = {
    id: number,
    name: string,
    birth_date: string,
    death_date: string,
    description: string,
    rating_id: number
}

export type RatingProps = {
    id: number,
    value: number,
    count: number
}

export type StatusProps = {
    id: number,
    name: string,
}

export type PublisherProps = {
    id: number, 
    name: string,
    description: string,
    rating_id: number,
}

export type SubGenreProps = {
    id: number, 
    name: string, 
    genre_id: number
}

export type SeriesProps = {
    id: number,
    name: string,
    description: string,
    ISBN: string,
    publisher_id: number,
    rating_id: number,
}

export type CartsBooksProps = {
    id: number,
    user_id: number,
    username: string,
    order_id: number,
    book_id: number,
    count: number,
    price: number,
    p_date: Date,
    status: string,
}

export type OrderProps = {
    id: number,
    user_id: number,
    username: string,
    count: number,
    price: number,
    p_date: string,
    status: string,
}

export type OrderAPIProps = {
    id: number,
    user_id: number,
    username: string,
    count: number,
    price: number,
    p_date: Date,
    status: string,
}

export type BookInCartProps = {
    id: number,
    price: number,
}

export type TokenJWTProps = {
    refresh: string,
    access: string,
}

export type TokenProps = {
    username: string,
    refresh: string,
    access: string,
}

export type UserProps = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
}