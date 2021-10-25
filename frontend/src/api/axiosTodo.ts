import axios from "axios";
import { Todo } from "../features/todo/todoSlice";

interface PayloadState {
  title: string;
  date: string;
}

const endpoint =
  process.env.backend_URL + "/api" || "http://localhost:3001/api";

export const getTodosListApi = async () => {
  try {
    const response = await axios.get(`${endpoint}/getTodos`);
    console.log(response);
    return response;
  } catch (err) {
    console.log("error on fetching todo-->", err);
  }
  return null;
};

export const addTodoApi = async (todo: PayloadState) => {
  try {
    await axios.post(`${endpoint}/addtodo`, todo);
    return true;
  } catch (err) {
    console.log("error on posting-->", err);
  }
  return false;
};

export const modifyTodoApi = async (todo: Todo) => {
  try {
    await axios.put(`${endpoint}/modifytodo`, todo);
    return true;
  } catch (err) {
    console.log("error on modifying-->", err);
  }
  return false;
};

export const deleteTodoApi = async (id: string) => {
  try {
    await axios.delete(`${endpoint}/deletetodo`, {
      data: {
        id: id,
      },
    });
    return true;
  } catch (err) {
    console.log("error on posting-->", err);
  }
  return false;
};
