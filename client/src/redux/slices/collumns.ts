import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface ICard {
  card_id: number;
  title: string;
  description: string;
}

export interface IColumn {
  [key: string]: {
    id: number;
    workspaceid: string;
    column_name: string;
    cards: ICard[];
  };
}

interface State {
  columns: IColumn;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  colLoading: boolean;
}

const initialState: State = {
  columns: {},
  status: "idle",
  error: null,
  colLoading: true,
};

export const fetchColumns = createAsyncThunk(
  "/questions/fetchColumns",
  async (wid: any) => {
    const response = await axios.get(`${apiUrl}/column?wid=${wid}`);
    const columns = response.data.data;
    let listColumns: IColumn = {};
    for (const i in columns) {
      const { id, ...rest } = columns[i];
      listColumns[id.toString()] = { ...rest };
    }
    return listColumns;
  }
);

export const createColumn = createAsyncThunk(
  "/column/create",
  async (columnForm: any) => {
    try {
      const { wid, ...bodyData } = columnForm;
      await axios.post(`${apiUrl}/column`, bodyData);
      const response = await axios.get(`${apiUrl}/column?wid=${wid}`);
      const columns = response.data.data;
      let listColumns: IColumn = {};
      for (const i in columns) {
        const { id, ...rest } = columns[i];
        listColumns[id.toString()] = { ...rest };
      }
      return listColumns;
    } catch (error) {}
  }
);

export const updateColumn = createAsyncThunk(
  "/column/update",
  async (columnUpdateForm: any) => {
    const { id, wid, ...rest } = columnUpdateForm;
    const bodyData = { ...rest, workspace_id: wid };
    try {
      await axios.put(`${apiUrl}/column?columnId=${id}`, bodyData);
      const response = await axios.get(`${apiUrl}/column?wid=${wid}`);
      return response.data.data;
    } catch (error) {}
  }
);

export const deleteColumn = createAsyncThunk(
  "column/delete",
  async (condition: any) => {
    try {
      const { wid, id } = condition;
      await axios.delete(`${apiUrl}/column?columnId=${id}`);
      const response = await axios.get(`${apiUrl}/column?wid=${wid}`);
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
      state.colLoading = true;
    },
    [fetchColumns.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload;
      state.colLoading = false;
    },
    [fetchColumns.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.colLoading = true;
    },

    [createColumn.fulfilled.toString()]: (state, action) => {
      state.status = "idle";
      state.colLoading = true;
    },

    [createColumn.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload;
    },
    [updateColumn.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload;
    },
    [deleteColumn.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload;
    },
  },
});

export default columnsSlice.reducer;
export const {} = columnsSlice.actions;
