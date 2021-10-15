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

export const createCard = createAsyncThunk(
  "/column/create",
  async (cardForm: any) => {
    try {
      const { id, ...bodyData } = cardForm;
      await axios.post(
        `http://localhost/practice2/Server/index.php/card?columnId=${id}`,
        bodyData
      );
      const response = await axios.get(
        `http://localhost/practice2/Server/index.php/column`
      );
      return response.data.data;
    } catch (error) {}
  }
);

export const deleteCard = createAsyncThunk(
  "/column/delete",
  async (id: number) => {
    try {
      await axios.delete(`http://localhost/practice2/Server/index.php/card?cardId=${id}`);
    } catch (error) {}
  }
);

export const updateCard = createAsyncThunk(
  "/column/update",
  async (updateForm: any) => {
    const { id, colId, ...bodyData } = updateForm;
    try {
      await axios.put(
        `http://localhost/practice2/Server/index.php/card?columnId=${colId}&cardId=${id}
        `,
        bodyData
      );
    } catch (error) {}
  }
);

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: {
    [createCard.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload;
    },
    [deleteCard.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
    },
  },
});

export default columnsSlice.reducer;
export const {} = columnsSlice.actions;
