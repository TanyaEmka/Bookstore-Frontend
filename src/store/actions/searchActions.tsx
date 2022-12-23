import { createAction } from "@reduxjs/toolkit";

export type searchActionProps = {
    name: string,
    min_price: string,
    max_price: string,
    status_id: string,
}

export const changeSearchName = createAction<searchActionProps>('SEARCH/CHANGE/NAME');

export type searchActions = ReturnType<typeof changeSearchName>;