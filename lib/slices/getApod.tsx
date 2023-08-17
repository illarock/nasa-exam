import { RootState } from "@/lib/store";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
  value: string;
  isLoading: boolean;
}

const initialState: initialState = {
  value: "",
  isLoading: true,
};

export const apodSlice = createSlice({
  name: "apod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApod.fulfilled, (state, action: PayloadAction<string>) => {
        state.value = action.payload;
        state.isLoading = false;
      })
      .addCase(getApod.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getApod = createAsyncThunk("apod/getApod", async (thunkAPI) => {
  try {
    const res = await fetch(`/api/apod`);
    const response = await res.json();

    return response;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const {} = apodSlice.actions;
export const apodState = (state: RootState) => state.apod;
export default apodSlice.reducer;
