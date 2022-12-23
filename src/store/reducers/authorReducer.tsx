import { authorActions } from "../actions/authorActions";
import { AuthorProps } from "../../Book/BookTypes";
import { authorInitialState } from "../initialState";

export interface IAuthorReducer {
    author: AuthorProps,
}

export const authorReducer = (state: IAuthorReducer = authorInitialState, action: authorActions) => {
    switch(action.type) {
        case 'AUTHOR/CHANGE':
            return {
                ...state,
                author: action.payload
            }
        default:
            return state;
    }
}