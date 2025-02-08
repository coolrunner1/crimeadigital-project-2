import {configureStore} from "@reduxjs/toolkit";
import cardsSlice from "../slices/cardsSlice.ts";

export const store = configureStore({
    reducer: {
        cards: cardsSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>