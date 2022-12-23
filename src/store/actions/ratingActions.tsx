import { createAction } from "@reduxjs/toolkit";
import { RatingProps } from "../../Book/BookTypes";

export const changeRating = createAction<RatingProps>('RATING/CHANGE');

export type ratingActions = ReturnType<typeof changeRating>;
