import { statusActions } from "../actions/statusActions";
import { StatusProps } from "../../Book/BookTypes";
import { statusInitialState } from "../initialState";

export interface IStatusReducer {
    status: StatusProps
}

export const statusReducer = (state: IStatusReducer = statusInitialState, action: statusActions) => {
    switch(action.type) {
        case 'STATUS/CHANGE':
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
}