import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  columns: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  columns: [],
  status: "idle",
  error: null,
};

export const fetchColumns = createAsyncThunk(
  "/questions/fetchColumns",
  async () => {
    const response = await axios.get(`http://localhost/practice2/Server/index.php/column`);

    return response.data.data;
  }
);

export const createColumn = createAsyncThunk(
  "/column/create",
  async (columnForm: any) => {
    try {
      await axios.post(`http://localhost/practice2/Server/index.php/column`, columnForm);
      const response = await axios.get(
        `http://localhost/practice2/Server/index.php/column`
      );
      return response.data.data;
    } catch (error) {}
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
      state.columns = action.payload;
    },
    [fetchColumns.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [createColumn.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      //   state.columns = [...state.columns, action.payload];
      state.columns = action.payload;
    },
  },
});

export default columnsSlice.reducer;
export const {} = columnsSlice.actions;