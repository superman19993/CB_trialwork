import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl, LoginForm } from "../types";

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

export const login = createAsyncThunk(
  "/user/login",
  async (loginForm: LoginForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      console.log(response.data);
    } catch (error) {}
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
export const {} = userSlice.actions;
