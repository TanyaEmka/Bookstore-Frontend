import { IIdReducer } from "./reducers/idReducer";
import { IBookReducer } from "./reducers/bookReducer";
import { IAuthorReducer } from "./reducers/authorReducer";
import { IRatingReducer } from "./reducers/ratingReducer";
import { IStatusReducer } from "./reducers/statusReducer";
import { IPublisherReducer } from "./reducers/publisherReducer";
import { ISubGenreReducer } from "./reducers/subgenreReducer";
import { ISeriesReducer } from "./reducers/seriesReducer";
import { ILoadingReducer } from "./reducers/loadingReducer";
import { ISearchReducer } from "./reducers/searchReducer";
import { ICartReducer } from "./reducers/cartReducer";
import { IOrderReducer } from "./reducers/orderReducer";
import { IUserReducer } from "./reducers/userReducer";

export const idInitialState: IIdReducer = {
    id: "1",
}

export const bookInitialState: IBookReducer = {
    book: {
        id: 1,
        title: "",
        author_id: 1,
        publisher_id: 1,
        subgenre_id: 1,
        series_id: 1,
        rating_id: 1,
        status_id: 1,
        price: 100,
        page_count: 20,
        language: "russian",
        publish_year: 2020,
        sale: 0,
        age_limit: 12,
        ISBN: "",
        eISBN: "",
        series_is: 0,
        count: 5,
    }
}

export const authorInitialState: IAuthorReducer = {
    author: {
        id: 1,
        name: "",
        birth_date: "",
        death_date: "",
        description: "",
        rating_id: 1
    }
}

export const ratingInitialState: IRatingReducer = {
    rating: {
        id: 1,
        value: 0,
        count: 0,
    }
}

export const statusInitialState: IStatusReducer = {
    status: {
        id: 1,
        name: "",
    }
}

export const publisherInitialState: IPublisherReducer = {
    publisher: {
        id: 1,
        name: "",
        description: "",
        rating_id: 1
    }
}

export const subgenreInitialState: ISubGenreReducer = {
    subgenre: {
        id: 1,
        name: "",
        genre_id: 1
    }
}

export const seriesInitialState: ISeriesReducer = {
    series: {
        id: 1,
        name: "",
        description: "",
        ISBN: "",
        publisher_id: 1,
        rating_id: 1
    }
}

export const loadingInitialState: ILoadingReducer = {
    loading: false
}

export const searchInitialState: ISearchReducer = {
    search: {
        name: "",
        min_price: "",
        max_price: "",
        status_id: "",
    }
}

export const cartInitialState: ICartReducer = {
    cart: {
        change: 0,
        id: 0,
    }
}

export const orderInitialState: IOrderReducer = {
    order: {
        id: 1,
        user_id: 1,
        username: "",
        count: 0,
        price: 1,
        p_date: "1000-01-01 00:00:00",
        status: 'N'
    }
}

export const userInitialState: IUserReducer = {
    user: {
        id: 0,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        is_staff: false
    }
}
