import { publisherActions } from "../actions/publisherActions";
import { PublisherProps} from "../../Book/BookTypes";
import { publisherInitialState } from "../initialState";

export interface IPublisherReducer {
    publisher: PublisherProps
}

export const publisherReducer = (state: IPublisherReducer = publisherInitialState, action: publisherActions) => {
    switch(action.type) {
        case 'PUBLISHER/CHANGE':
            return {
                ...state,
                publisher: action.payload
            }
        default:
            return state
    }    
}