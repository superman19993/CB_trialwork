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

export const createChecklist= createAsyncThunk(
  "/checklists/create",
  async (createChecklistForm: any)=>{
    try {
      const { cardId, ...bodyData } = createChecklistForm;
      console.log(bodyData);
      await axios.post(`${apiUrl}/checklist?cardId=${cardId}`, bodyData);
      // const response = await axios.get(`${apiUrl}/column?wid=${wid}`);
      // return response.data.data;
    } catch (error) {}
  }
)

export const updateStatus = createAsyncThunk(
  "/checklists/updateStatus",
  async (updateChecklistForm: any) =>{
    const { id, ...bodyData } = updateChecklistForm;
    await axios.put(`${apiUrl}/checklist?id=${id}`, bodyData);
  }
);


const checklistsSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {},
  extraReducers: {
    [createChecklist.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.checklists = action.payload;
    },
    [fetchChecklists.fulfilled.toString()]: (state, action) => {
      state.checklists = action.payload;
      state.status = "succeeded";
    },
  },
});

export default checklistsSlice.reducer;
export const {} = checklistsSlice.actions;