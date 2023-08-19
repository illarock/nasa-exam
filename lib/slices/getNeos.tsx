import { RootState } from "@/lib/store";
import { axiType, neosType, neosdateType } from "@/types/neoType";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
  value: neosType[];
  xy: axiType;
  isLoading: boolean;
}

const initialState: initialState = {
  value: [],
  xy: "",
  isLoading: true,
};

export const neosSlice = createSlice({
  name: "neos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNeos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getNeos.fulfilled,
        (state, action: PayloadAction<neosType[]>) => {
          state.value = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getNeo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getNeo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNeo.fulfilled, (state, action: PayloadAction<axiType>) => {
        console.log(action.payload);
        state.xy = action.payload;
        state.isLoading = false;
      })
      .addCase(getNeos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getNeos = createAsyncThunk(
  "apod/getNeos",
  async (dates: neosdateType) => {
    const start_date = dates.start_date;
    const end_date = dates.end_date;

    try {
      const res = await fetch(
        `/api/neos?start_date=${start_date}&end_date=${end_date}`
      );
      const response = await res.json();

      return response;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

export const getNeo = createAsyncThunk("apod/getNeo", async (id: string) => {
  try {
    const res = await fetch(`/api/neos/${id}`);
    const response = await res.json();

    return response;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const {} = neosSlice.actions;
export const neosState = (state: RootState) => state.neos;
export default neosSlice.reducer;
