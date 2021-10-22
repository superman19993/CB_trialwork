import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  checklists: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  checklists: [],
  status: "idle",
  error: null,
};

export const fetchChecklists = createAsyncThunk(
  "/questions/fetchChecklists",
  async (cardId: number) => {
    const response = await axios.get(`${apiUrl}/checklist?cardId=${cardId}`);
    return response.data.data;
  }
);

const checklistsSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchChecklists.fulfilled.toString()]: (state, action) => {
      state.checklists = action.payload;
      state.status = "succeeded";
    },
  },
});

export default checklistsSlice.reducer;
export const {} = checklistsSlice.actions;
