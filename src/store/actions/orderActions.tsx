import { createAction } from "@reduxjs/toolkit";
import { OrderProps } from "../../Book/BookTypes";

export const changeOrder = createAction<OrderProps>('ORDER/CHANGE');

export type orderActions = ReturnType<typeof changeOrder>;