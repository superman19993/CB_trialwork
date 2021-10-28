import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  usersInCard: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  usersInCard: [],
  status: "idle",
  error: null,
};

export const fetchUsersInCard = createAsyncThunk(
  "/card/fetchUsersInCard",
  async (cardId: number) => {
    const response = await axios.get(`${apiUrl}/user?cardId=${cardId}`);
    return response.data.data;
  }
);


export const fetchUsersInWorkspace = createAsyncThunk(
  "/card/fetchUsersInWorkspace",
  async (wid: string|null) => {
    const response = await axios.get(`${apiUrl}/user?workspaceId=${wid}`);
    return response.data.data;
  }
);
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
    [fetchUsersInCard.fulfilled.toString()]: (state, action) => {
      state.usersInCard = action.payload;
      state.status = "succeeded";
    },
  },
});

export default usersCardsSlice.reducer;
export const {} = usersCardsSlice.actions;
