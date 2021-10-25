import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Todo {
  id: String;
  title: String;
  isFinished: Boolean;
  date: Date;
}

const baseUrl = "http://localhost:3001/api/";

export const todoApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => ({
        url: "getTodos/",
        method: "GET",
      }),
    }),
    addTodo: build.mutation<Todo, Todo>({
      query: (body) => ({
        url: "addTodo/",
        method: "POST",
        body: body,
      }),
    }),
    modifyTodo: build.mutation<Todo, Todo>({
      query: (payload) => ({
        url: "modifyTodo",
        method: "PUT",
        body: payload,
      }),
    }),
    deleteTodo: build.mutation<Todo, Todo>({
      query: (payload) => ({
        url: "modifyTodo",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useModifyTodoMutation,
} = todoApi;
