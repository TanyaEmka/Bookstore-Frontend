import { orderActions } from "../actions/orderActions";
import { OrderProps } from "../../Book/BookTypes";
import { orderInitialState } from "../initialState";

export interface IOrderReducer {
    order: OrderProps,
}

export const orderReducer = (state: IOrderReducer = orderInitialState, action: orderActions) => {
    switch(action.type) {
        case 'ORDER/CHANGE':
            return {
                ...state,
                order: action.payload
            }
        default:
            return state
    }
}