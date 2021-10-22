import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { apiUrl } from "../types";

interface State {
  workspaces: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  wid: string | null;
}

const initialState: State = {
  workspaces: [],
  status: "idle",
  error: null,
  wid: null,
};

export const fetchWorkspace = createAsyncThunk(
  "/workspace/getall",
  async (uid: any) => {
    try {
      const response = await axios.get(`${apiUrl}/workspace?uid=${uid}`);
      return response.data.data;
    } catch (error) {}
  }
);

export const chooseWorkspace = createAsyncThunk(
  "/workspace/choose",
  (wid: any) => {
    return wid;
  }
);

export const deleteWorkspace = createAsyncThunk(
  "workspace/delete",
  async (condition: any) => {
    try {
      const { wid, uid } = condition;
      await axios.delete(`${apiUrl}/workspace?wid=${wid}&uid=${uid}`);
      return wid;
    } catch (error) {}
  }
);

export const updateWorkspace = createAsyncThunk(
  "workspace/update",
  async (condition: any) => {
    try {
      const { wid, uid, ...updatedObj } = condition;
      const response = await axios.put(
        `${apiUrl}/workspace?wid=${wid}&uid=${uid}`,
        updatedObj
      );
      return response.data;
    } catch (error) {}
  }
);

export const createWorkspace = createAsyncThunk(
  "workspace/create",
  async (condition: any) => {
    const { uid, ...createdObj } = condition;
    const response = await axios.post(
      `${apiUrl}/workspace?uid=${uid}`,
      createdObj
    );
  }
);

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWorkspace.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded";
      state.workspaces = action.payload;
    },
    [chooseWorkspace.fulfilled.toString()]: (state, action) => {
      state.wid = action.payload;
      console.log(state.wid);
    },
    [deleteWorkspace.fulfilled.toString()]: (state, action) => {
      state.wid = action.payload;
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace.id !== action.payload
      );
    },
    [updateWorkspace.fulfilled.toString()]: (state, action) => {
      const newWorkspaces = state.workspaces.map((workspace) =>
        workspace.id === action.payload.id ? action.payload : workspace
      );
      state.workspaces = newWorkspaces;
    },
  },
});

export default workspacesSlice.reducer;
export const {} = workspacesSlice.actions;
