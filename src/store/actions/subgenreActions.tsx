import { createAction } from "@reduxjs/toolkit";
import { SubGenreProps } from "../../Book/BookTypes";

export const changeSubGenre = createAction<SubGenreProps>('SUBGENRE/CHANGE');

export type subgenreActions = ReturnType<typeof changeSubGenre>;