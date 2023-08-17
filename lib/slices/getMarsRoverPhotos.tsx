import { RootState } from "@/lib/store";
import { photoType } from "@/types/photosType";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
  value: Array<photoType>;
  isLoading: boolean;
}

const initialState: initialState = {
  value: [],
  isLoading: true,
};

export const marsRoverPhotosSlice = createSlice({
  name: "mrp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMarsRoverPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getMarsRoverPhotos.fulfilled,
        (state, action: PayloadAction<photoType[]>) => {
          state.value = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getMarsRoverPhotos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getMarsRoverPhotos = createAsyncThunk(
  "mrp/getMarsRoverPhotos",

  async (date: string | null | undefined) => {
    try {
      console.log(date);
      const res = date
        ? await fetch(`/api/mrp?date=${date}`)
        : await fetch(`/api/mrp`);
      const response = await res.json();

      return response;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

export const {} = marsRoverPhotosSlice.actions;
export const marsRoverPhotosState = (state: RootState) => state.mrp;
export default marsRoverPhotosSlice.reducer;
