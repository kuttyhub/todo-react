import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { todoApi } from "../features/todo/todo-api-slice";
import todoSlice from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
