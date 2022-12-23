import { subgenreActions } from "../actions/subgenreActions";
import { SubGenreProps } from "../../Book/BookTypes";
import { subgenreInitialState } from "../initialState";

export interface ISubGenreReducer {
    subgenre: SubGenreProps
}

export const subgenreReducer = (state: ISubGenreReducer = subgenreInitialState, action: subgenreActions) => {
    switch(action.type) {
        case 'SUBGENRE/CHANGE':
            return {
                ...state,
                subgenre: action.payload
            }
        default:
            return state;
    }
}