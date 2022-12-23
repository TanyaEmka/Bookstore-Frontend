import { searchActions, searchActionProps } from "../actions/searchActions";
import { searchInitialState } from "../initialState";

export interface ISearchReducer {
    search: searchActionProps
}

export const searchReducer = (state: ISearchReducer = searchInitialState, action: searchActions): ISearchReducer => {
    switch(action.type) {
        case 'SEARCH/CHANGE/NAME':
            return {
                ...state,
                search: action.payload
            }
        default:
            return state;
    }
}
