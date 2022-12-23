import { createAction } from "@reduxjs/toolkit";

export const changeId = createAction<string>('ID/CHANGE');

export type idActions = ReturnType<typeof changeId>;