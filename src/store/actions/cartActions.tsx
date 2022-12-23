import { createAction } from "@reduxjs/toolkit";

export type cartActionProps = {
    change: number,
    id: number,
}

export const changeCart = createAction<cartActionProps>('CART/CHANGE');

export type cartActions = ReturnType<typeof changeCart>;