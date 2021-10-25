import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  _id: string;
  title: string;
  isfinished: boolean;
  date: Date;
}

interface TodosState {
  todoList: Todo[];
}

const initialState: TodosState = {
  todoList: [],
};

const TodoSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<Todo[]>) {
      console.log("seting action-->", action);
      state.todoList = action.payload;
    },
    // addTodo(state, action: PayloadAction<Todo>) {
    //   state.todoList.push(action.payload);
    // },
    // modifyTodo(state, action: PayloadAction<Todo>) {
    //   const index = state.todoList.findIndex(
    //     (t: Todo) => t.id === action.payload.id
    //   );

    //   //replace old item with new item
    //   state.todoList.splice(index, 1, action.payload);
    // },
    // removeTodo(state, action: PayloadAction<string>) {
    //   state.todoList = state.todoList.filter(
    //     (t: Todo) => t.id !== action.payload
    //   );
    // },
  },
});

export const { setTodoList } = TodoSlice.actions;
export default TodoSlice.reducer;
