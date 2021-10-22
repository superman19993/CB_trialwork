import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./slices/collumns";
import userSlice from "./slices/user";
import workspacesSlice from "./slices/workspace";

const store = configureStore({
  reducer: {
    user: userSlice,
    columns: columnsSlice,
    workspaces: workspacesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
