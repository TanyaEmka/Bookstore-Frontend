import { ratingActions } from "../actions/ratingActions";
import { RatingProps } from "../../Book/BookTypes";
import { ratingInitialState } from "../initialState";

export interface IRatingReducer {
    rating: RatingProps
}

export const ratingReducer = (state: IRatingReducer = ratingInitialState, action: ratingActions) => {
    switch(action.type) {
        case 'RATING/CHANGE':
            return {
                ...state,
                rating: action.payload
            }
        default: 
            return state;
    }
}