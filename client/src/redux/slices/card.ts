import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  cardId: number;
  columns: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  cardId: 0,
  columns: [],
  status: "idle",
  error: null,
};

export const createCard = createAsyncThunk(
  "/column/create",
  async (cardForm: any) => {
    try {
      const { id, wid, ...bodyData } = cardForm;
      console.log(bodyData);
      await axios.post(`${apiUrl}/card?columnId=${id}`, bodyData);
      const response = await axios.get(`${apiUrl}/column?wid=${wid}`);
      return response.data.data;
    } catch (error) {}
  }
);

export const deleteCard = createAsyncThunk(
  "/column/delete",
  async (condition: any) => {
    try {
      const { id, wid } = condition;
      await axios.delete(`${apiUrl}/card?cardId=${id}`);
    } catch (error) {}
  }
);

export const updateCard = createAsyncThunk(
  "/column/update",
  async (updateForm: any) => {
    const { id, colId, wid, ...bodyData } = updateForm;
    try {
      await axios.put(
        `${apiUrl}/card?columnId=${colId}&cardId=${id}
        `,
        bodyData
      );
      const response = await axios.get(`${apiUrl}/column?wid=${wid}`);
      return response.data.data;
    } catch (error) {}
  }
);

export const chooseCard = createAsyncThunk("card/choose", (cardId: number) => {
  return cardId;
});

export const changeCardForCol = createAsyncThunk(
  "card/changeCard",
  async (condition: any) => {
    try {
      const { destColId, cardId, wid } = condition;
      await axios.put(`${apiUrl}/card/changeCard?cardId=${cardId}`, {
        destColId,
      });
    } catch (error) {}
  }
);



const cardsSlice = createSlice({
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
    [updateCard.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload;
    },
    [chooseCard.fulfilled.toString()]: (state, action) => {
      state.cardId = action.payload;
    },
    [changeCardForCol.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.columns = action.payload;
    },
  },
});

export default cardsSlice.reducer;
export const {} = cardsSlice.actions;
