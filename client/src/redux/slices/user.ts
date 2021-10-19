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

export const logIn = createAsyncThunk(
    "/user/login",
    async (loginForm: any)=> {
        try {
            const {...bodyData }= loginForm;
            const response = await axios.post(`http://localhost/practice2/Server/index.php/user`, bodyData);
            console.log(response);
        } catch (error){}
    }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
