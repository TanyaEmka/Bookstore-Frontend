import { loadingAction } from "../actions/loadingAction";
import { loadingInitialState } from "../initialState";

export interface ILoadingReducer {
    loading: boolean
}

export const loadingReducer = (state: ILoadingReducer = loadingInitialState, action: loadingAction) => {
    switch(action.type) {
        case 'LOADING/CHANGE':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}