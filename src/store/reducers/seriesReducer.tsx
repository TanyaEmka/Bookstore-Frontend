import { seriesActions } from "../actions/seriesActions";
import { SeriesProps } from "../../Book/BookTypes";
import { seriesInitialState } from "../initialState";

export interface ISeriesReducer {
    series: SeriesProps
}

export const seriesReducer = (state: ISeriesReducer = seriesInitialState, action: seriesActions) => {
    switch(action.type) {
        case 'SERIES/CHANGE':
            return {
                ...state,
                series: action.payload
            }
        default: 
            return state;
    }
}