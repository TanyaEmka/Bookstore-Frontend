import { userActions } from "../actions/userActions";
import { UserProps } from "../../Book/BookTypes";
import { userInitialState } from "../initialState";

export interface IUserReducer {
    user: UserProps
}

export const userReducer = (state: IUserReducer = userInitialState, actions: userActions): IUserReducer => {
    switch(actions.type) {
        case 'USER/CHANGE':
            return {
                ...state,
                user: actions.payload
            }
        default:
            return state
    }
}