import { createAction } from "@reduxjs/toolkit";
import { StatusProps} from "../../Book/BookTypes";

export const changeStatus = createAction<StatusProps>('STATUS/CHANGE');

export type statusActions = ReturnType<typeof changeStatus>;