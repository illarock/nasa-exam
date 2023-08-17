import { configureStore } from "@reduxjs/toolkit";
import getApodSlice from "./slices/getApod";
import marsRoverPhotosSlice from "./slices/getMarsRoverPhotos";

export const store = configureStore({
  reducer: {
    apod: getApodSlice,
    mrp: marsRoverPhotosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
