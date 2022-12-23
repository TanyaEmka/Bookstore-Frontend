import { idActions } from "../actions/idActions";
import { idInitialState } from "../initialState";

export interface IIdReducer {
    id: string,
}

export const idReducer = (state = idInitialState, action: idActions): IIdReducer => {
    switch(action.type) {
        case 'ID/CHANGE':
            return {
                ...state,
                id: action.payload
            }
        default:
            return state;
    }
}