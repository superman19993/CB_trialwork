import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./slices/collumns";
import userSlice from "./slices/user";
import workspacesSlice from "./slices/workspace";
import checklistsSlice from "./slices/checklist";
import cardsSlice from "./slices/card";
import usersCardsSlice from "./slices/usersCards";
import commentsSlice from "./slices/comment";

const store = configureStore({
  reducer: {
    user: userSlice,
    columns: columnsSlice,
    workspaces: workspacesSlice,
    cards: cardsSlice,
    checklists: checklistsSlice,
    users_cards: usersCardsSlice,
    comments: commentsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
