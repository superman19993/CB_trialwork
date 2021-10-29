import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl } from "../types";

interface State {
  comments: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  comments: [],
  status: "idle",
  error: null,
};

export const createComment = createAsyncThunk(
  "/comments/create",
  async (commentForm: any) => {
    try {
      const { uid, cardId, ...bodyData } = commentForm;
      const response = await axios.post(
        `${apiUrl}/comment?uid=${uid}&cardId=${cardId}`,
        bodyData
      );
      return response.data;
    } catch (error) {}
  }
);

export const getComments = createAsyncThunk(
  "/comments/get",
  async (cardId: number) => {
    try {
      const response = await axios.get(`${apiUrl}/comment?cardId=${cardId}`);
      return response.data.data;
    } catch (error) {}
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [createComment.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.comments = [action.payload, ...state.comments];
    },
    [getComments.fulfilled.toString()]: (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      },
  },
});

export default commentsSlice.reducer;
export const {} = commentsSlice.actions;
