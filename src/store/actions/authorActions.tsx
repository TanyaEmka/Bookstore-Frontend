import { createAction } from "@reduxjs/toolkit";
import { AuthorProps } from "../../Book/BookTypes";

export const changeAuthor = createAction<AuthorProps>('AUTHOR/CHANGE');

export type authorActions = ReturnType<typeof changeAuthor>;