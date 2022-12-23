import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";

import { IIdReducer, idReducer } from "./reducers/idReducer";
import { IBookReducer, bookReducer } from "./reducers/bookReducer";
import { IAuthorReducer, authorReducer } from "./reducers/authorReducer";
import { IRatingReducer, ratingReducer } from "./reducers/ratingReducer";
import { IStatusReducer, statusReducer } from "./reducers/statusReducer";
import { IPublisherReducer, publisherReducer } from "./reducers/publisherReducer";
import { ISubGenreReducer, subgenreReducer } from "./reducers/subgenreReducer";
import { ISeriesReducer, seriesReducer } from "./reducers/seriesReducer";
import { ILoadingReducer, loadingReducer } from "./reducers/loadingReducer";
import { ISearchReducer, searchReducer } from "./reducers/searchReducer";
import { ICartReducer, cartReducer } from "./reducers/cartReducer";
import { IOrderReducer, orderReducer } from "./reducers/orderReducer";
import { ITokenReducer, tokenReducer } from "./reducers/tokenReducer";
import { IUserReducer, userReducer } from "./reducers/userReducer";

import { idActions } from "./actions/idActions";
import { bookActions } from "./actions/bookActions";
import { authorActions } from "./actions/authorActions";
import { ratingActions } from "./actions/ratingActions";
import { statusActions } from "./actions/statusActions";
import { publisherActions } from "./actions/publisherActions";
import { subgenreActions } from "./actions/subgenreActions";
import { seriesActions } from "./actions/seriesActions";
import { loadingAction } from "./actions/loadingAction";
import { searchActions } from "./actions/searchActions";
import { cartActions } from "./actions/cartActions";
import { orderActions } from "./actions/orderActions";
import { tokenActions } from "./actions/tokenActions";
import { userActions } from "./actions/userActions";

export interface IAppStore {
    idR: IIdReducer,
    bookR: IBookReducer,
    authorR: IAuthorReducer,
    ratingR: IRatingReducer,
    statusR: IStatusReducer,
    publisherR: IPublisherReducer,
    subgenreR: ISubGenreReducer,
    seriesR: ISeriesReducer,
    loadingR: ILoadingReducer,
    searchR: ISearchReducer,
    cartR: ICartReducer,
    orderR: IOrderReducer,
    tokenR: ITokenReducer,
    userR: IUserReducer
}

export type AppActions = idActions | bookActions | authorActions | ratingActions | statusActions | publisherActions | subgenreActions | seriesActions | loadingAction 
                            | searchActions | cartActions | orderActions | tokenActions
                            | userActions;

const rootReducer = combineReducers({
    idR: idReducer,
    bookR: bookReducer,
    authorR: authorReducer,
    ratingR: ratingReducer,
    statusR: statusReducer,
    publisherR: publisherReducer,
    subgenreR: subgenreReducer,
    seriesR: seriesReducer,
    loadingR: loadingReducer,
    searchR: searchReducer,
    cartR: cartReducer,
    orderR: orderReducer,
    tokenR: tokenReducer,
    userR: userReducer
});

const store = configureStore({
    reducer: rootReducer,
})

export default store;

export type AppDispath = typeof store.dispatch;

export const useAppDispath = () => useDispatch<AppDispath>();
export const useAppSelector: TypedUseSelectorHook<IAppStore> = useSelector;