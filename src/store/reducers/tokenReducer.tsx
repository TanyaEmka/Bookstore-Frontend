import { tokenActions } from "../actions/tokenActions";
import { TokenProps } from "../../Book/BookTypes";

export interface ITokenReducer {
    user: TokenProps
}

export const tokenInitialState: ITokenReducer = {
    user: {
        username: "",
        refresh: "",
        access: "",
    }
}

export const tokenReducer = (state: ITokenReducer = tokenInitialState, action: tokenActions): ITokenReducer => {
    switch(action.type) {
        case "TOKEN/CHANGE":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}