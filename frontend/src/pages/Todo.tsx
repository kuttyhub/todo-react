import { Paper, Typography, Button, InputBase, Divider } from "@mui/material";

import styled from "@emotion/styled";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";
import {
  addTodoApi,
  deleteTodoApi,
  getTodosListApi,
  modifyTodoApi,
} from "../api/axiosTodo";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setTodoList, Todo } from "../features/todo/todoSlice";

import TodoTile from "./TodoTile";

// var isfirst = true;

const TodoContainer = () => {
  const dispatch = useAppDispatch();
  const [title, settitle] = useState<string>();

  useEffect(() => {
    // if (isfirst) {
    console.log("fetch called");
    fetchTodos();
    // }
    console.log("useEffect --called --->");
  }, []);

  const fetchTodos = async () => {
    // isfirst = false;
    const response = await getTodosListApi();
    var todolist: Todo[] = response ? response.data : [];
    console.log("payload-->", todolist);
    dispatch(setTodoList(todolist));
  };

  const todoList = useAppSelector((state) => state.todo.todoList);

  const handleChange = (e: any) => {
    settitle(e.target.value);
  };
  const handleClick = async () => {
    if (title) {
      try {
        var payload = {
          title: title.trim(),
          date: Date.now().toString(),
        };
        console.log("post payload-->", payload);
        const status = await addTodoApi(payload);
        if (status) fetchTodos();

        settitle("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdateTodo = async (temp: Todo) => {
    try {
      const status = await modifyTodoApi(temp);
      if (status) fetchTodos();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const status = await deleteTodoApi(id);
      if (status) fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MyDiv>
      <Typography variant="h1" component={motion.h1}>
        Todo App
      </Typography>
      <Paper
        component={motion.div}
        sx={{ padding: "1rem 1.5rem", minWidth: "60vw" }}
      >
        <AnimateSharedLayout>
          <Paper
            component={motion.div}
            layout
            sx={{
              display: "flex",

              alignItems: "center",
              flexGrow: 1,
            }}
            elevation={0}
          >
            <InputBase
              sx={{
                p: "3px 1rem",
                marginRight: "1rem",

                borderRadius: 4,
                border: "none",
                flex: 1,
                backgroundColor: "#fff5f5",
              }}
              value={title}
              onChange={handleChange}
              placeholder="Add Todo"
            />
            <Button variant="contained" onClick={handleClick}>
              Add
            </Button>
          </Paper>
          <AnimatePresence>
            <div style={{ marginTop: "1rem" }}>
              {todoList.map((todo: Todo, idx) => {
                return (
                  <motion.div
                    key={todo._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TodoTile
                      key={idx}
                      todo={todo}
                      handleDelete={handleDelete}
                      handleUpdateTodo={handleUpdateTodo}
                    />
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </AnimateSharedLayout>
      </Paper>
    </MyDiv>
  );
};

const MyDiv = styled(motion.div)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 80vw;
  /* background-color: gray; */
  h1 {
    margin: 4rem 0rem;
    font-weight: 600;
  }
`;

export default TodoContainer;
