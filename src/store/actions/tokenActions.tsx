import { createAction } from "@reduxjs/toolkit";
import { TokenProps } from "../../Book/BookTypes";

export const changeToken = createAction<TokenProps>("TOKEN/CHANGE");

export type tokenActions = ReturnType<typeof changeToken>;