import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { apiUrl } from "../types";

interface State {
  workspaces: any[];
  joinUsers: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  wid: string | null;
  userLoading: boolean;
  workspaceName: string;
}

const initialState: State = {
  workspaces: [],
  status: "idle",
  error: null,
  wid: localStorage.getItem("wid"),
  joinUsers: [],
  userLoading: true,
  workspaceName: "workspace name",
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
  (bodyData: any) => {
    let workspaceName: string = "Workspace name";
    const { wid, workspaces } = bodyData;
    console.log(bodyData);
    for (const i in workspaces) {
      if (workspaces[i].id === wid) {
        workspaceName = workspaces[i].workspace_name;
      }
    }
    return { wid, workspaceName };
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
    return response.data;
  }
);

export const inviteUserToWorkspace = createAsyncThunk(
  "workspace/invite",
  async (condition: any) => {
    const { wid, ...data } = condition;
    console.log(`${apiUrl}/workspace/invite?wid=${wid}`);
    await axios.post(`${apiUrl}/workspace/invite?wid=${wid}`, data);
    return data.username;
  }
);

export const getAllUsersInWorkspace = createAsyncThunk(
  "workspace/user",
  async (wid: string | null) => {
    const response = await axios.get(`${apiUrl}/workspace/users?wid=${wid}`);
    return response.data;
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
      state.wid = action.payload.wid;
      state.workspaceName = action.payload.workspaceName;
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
    [createWorkspace.fulfilled.toString()]: (state, action) => {
      state.workspaces = [action.payload, ...state.workspaces];
    },
    [inviteUserToWorkspace.fulfilled.toString()]: (state, action) => {
      state.joinUsers = [action.payload, ...state.joinUsers];
    },
    [getAllUsersInWorkspace.fulfilled.toString()]: (state, action) => {
      state.joinUsers = action.payload;
      state.userLoading = false;
    },
    [getAllUsersInWorkspace.pending.toString()]: (state, action) => {
      state.userLoading = true;
    },
  },
});

export default workspacesSlice.reducer;
export const {} = workspacesSlice.actions;
