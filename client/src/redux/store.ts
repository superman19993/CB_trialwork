import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./slices/collumns";
import checklistsSlice from "./slices/checklist";
import cardsSlice from "./slices/card";

const store = configureStore({
  reducer: {
    columns: columnsSlice,
    checklists: checklistsSlice,
    cards: cardsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
