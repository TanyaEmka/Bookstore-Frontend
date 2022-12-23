import { createAction } from "@reduxjs/toolkit";
import { UserProps } from "../../Book/BookTypes";

export const changeUser = createAction<UserProps>('USER/CHANGE');

export type userActions = ReturnType<typeof changeUser>