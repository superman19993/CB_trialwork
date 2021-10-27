import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./slices/collumns";
import userSlice from "./slices/user";
import workspacesSlice from "./slices/workspace";
import checklistsSlice from "./slices/checklist";
import cardsSlice from "./slices/card";
import usersCardsSlice from "./slices/usersCards";

const store = configureStore({
  reducer: {
    user: userSlice,
    columns: columnsSlice,
    workspaces: workspacesSlice,
    cards: cardsSlice,
    checklists: checklistsSlice,
    users_cards: usersCardsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
