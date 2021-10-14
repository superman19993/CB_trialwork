import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  paginateQuestion: any[];
  columns: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  paginateQuestion: [],
  columns: [],
  status: "idle",
  error: null,
};

export const fetchColumns = createAsyncThunk(
  "/questions/fetchColumns",
  async () => {
    const response = await axios.get(`${apiUrl}/questions`);
    return response.data;
  }
);

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchColumns.pending.toString()]: (state, action) => {
      state.status = "loading";
    },
    [fetchColumns.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload.data;
    },
    [fetchColumns.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default columnsSlice.reducer;
export const {} = columnsSlice.actions;
