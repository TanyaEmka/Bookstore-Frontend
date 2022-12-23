import { createAction } from "@reduxjs/toolkit";
import { BookElementProps } from "../../Book/BookTypes";

export const changeBook = createAction<BookElementProps>('BOOK/CHANGE');

export type bookActions = ReturnType<typeof changeBook>;