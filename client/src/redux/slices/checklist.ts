import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  checklists: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  percentage: number;
}

const initialState: State = {
  checklists: [],
  status: "idle",
  error: null,
  percentage:0,
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
      const { cardid, ...bodyData } = createChecklistForm;
      console.log(bodyData);
      await axios.post(`${apiUrl}/checklist?cardId=${cardid}`, bodyData);
    } catch (error) {}
  }
)

export const updateChecklist = createAsyncThunk(
  "/checklists/updateChecklist",
  async (updateChecklistForm: any) =>{
    const { id, ...bodyData } = updateChecklistForm;
    await axios.put(`${apiUrl}/checklist?id=${id}`, bodyData);
  }
);

export const deleteChecklist= createAsyncThunk(
  "/checklists/delete",
  async (id :number)=>{
    await axios.delete(`${apiUrl}/checklist?id=${id}`);
  }
)

export const calculatePercentage= createAsyncThunk(
  "card/calculate",
  (condition: any)=>{
    const DoneChecklists = condition.reduce(
      (counter:number, { status }:{status:string}) => (status === "1" ? (counter += 1) : counter),
      0
    );
    const Percentage = ((DoneChecklists / condition.length) * 100).toFixed(
      0
    );
    return Percentage;
  }
)

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
    [calculatePercentage.fulfilled.toString()]: (state,action)=> {
      state.percentage= action.payload;
    }
  },
});

export default checklistsSlice.reducer;
export const {} = checklistsSlice.actions;
