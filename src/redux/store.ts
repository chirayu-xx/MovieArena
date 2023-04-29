import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./features/homeSlice";


export const store = configureStore({
  reducer: {
    home : homeSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
