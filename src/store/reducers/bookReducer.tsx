import { bookActions } from "../actions/bookActions";
import { BookElementProps } from "../../Book/BookTypes";
import { bookInitialState } from "../initialState";

export interface IBookReducer {
    book: BookElementProps,
}

export const bookReducer = (state: IBookReducer = bookInitialState, action: bookActions): IBookReducer => {
    switch(action.type) {
        case 'BOOK/CHANGE':
            return {
                ...state,
                book: action.payload
            }
        default:
            return state;
    }
}