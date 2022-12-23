import { createAction } from "@reduxjs/toolkit";
import { PublisherProps } from "../../Book/BookTypes";

export const changePublisher = createAction<PublisherProps>('PUBLISHER/CHANGE');

export type publisherActions = ReturnType<typeof changePublisher>;