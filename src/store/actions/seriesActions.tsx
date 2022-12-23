import { createAction } from "@reduxjs/toolkit";
import { SeriesProps } from "../../Book/BookTypes";

export const changeSeries = createAction<SeriesProps>('SERIES/CHANGE');

export type seriesActions = ReturnType<typeof changeSeries>;