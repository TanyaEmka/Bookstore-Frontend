import { createAction } from "@reduxjs/toolkit";

export const changeloading = createAction<boolean>('LOADING/CHANGE');

export type loadingAction = ReturnType<typeof changeloading>;