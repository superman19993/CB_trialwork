import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  users: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  users: [],
  status: "idle",
  error: null,
};

// export const fetchChecklists = createAsyncThunk(
//   "/questions/fetchChecklists",
//   async (cardId: number) => {
//     const response = await axios.get(`${apiUrl}/checklist?cardId=${cardId}`);
//     return response.data.data;
//   }
// );

// export const createChecklist= createAsyncThunk(
//   "/checklists/create",
//   async (createChecklistForm: any)=>{
//     try {
//       const { cardid, ...bodyData } = createChecklistForm;
//       console.log(bodyData);
//       await axios.post(`${apiUrl}/checklist?cardId=${cardid}`, bodyData);
//     } catch (error) {}
//   }
// )

// export const updateChecklist = createAsyncThunk(
//   "/checklists/updateChecklist",
//   async (updateChecklistForm: any) =>{
//     const { id, ...bodyData } = updateChecklistForm;
//     await axios.put(`${apiUrl}/checklist?id=${id}`, bodyData);
//   }
// );

// export const deleteChecklist= createAsyncThunk(
//   "/checklists/delete",
//   async (id :number)=>{
//     await axios.delete(`${apiUrl}/checklist?id=${id}`);
//   }
// )

const usersCardsSlice = createSlice({
  name: "users_cards",
  initialState,
  reducers: {},
  extraReducers: {

  },
});

export default usersCardsSlice.reducer;
export const {} = usersCardsSlice.actions;
