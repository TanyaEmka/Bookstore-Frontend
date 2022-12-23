import { cartActions } from "../actions/cartActions";
import { cartInitialState } from "../initialState";

export interface ICartReducer {
    cart: {
        change: number,
        id: number,
    }
}

export const cartReducer = (state: ICartReducer = cartInitialState, action: cartActions): ICartReducer => {
    switch(action.type) {
        case 'CART/CHANGE':
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state
    }
}