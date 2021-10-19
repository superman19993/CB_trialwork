import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl, LoginForm } from "../types";

interface State {
  user: any;
  isAuthenticated: boolean;
  authLoading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  authLoading: false,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "/user/login",
  async (loginForm: LoginForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      console.log(response.data);
      return response.data;
    } catch (error) {}
  }
);

export const logout = createAsyncThunk("/user/logout", async () => {
  try {
    await axios.get(`${apiUrl}/auth/logout`);
  } catch (error) {}
});

export const loadUser = createAsyncThunk("/user/loaduser", async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth/loaduser`);
    return response.data;
  } catch (error) {}
});

export const register = createAsyncThunk(
  "/user/register",
  async (registerForm: any) => {
    const response = await axios.post(`${apiUrl}/auth/register`, registerForm);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [login.rejected.toString()]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [loadUser.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    [logout.fulfilled.toString()]: (state, action) => {
      state.status = "idle";
      state.user = null;
      state.isAuthenticated = false;
    },
    [register.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
