import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stack, Checkbox, Button, TextField, IconButton } from "@mui/material";
import { Todo } from "../features/todo/todoSlice";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
const TodoTile = (props: any) => {
  const { todo, handleDelete, handleUpdateTodo } = props;

  const [formData, setFormData] = useState({
    isChecked: todo.isfinished,
    title: todo.title,
  });

  const [isEditing, setEditing] = useState(false);
  const toggleState = () => setEditing(!isEditing);

  const updateTodo = () => {
    if (
      formData.isChecked !== todo.isfinished ||
      formData.title !== todo.title
    ) {
      var temp: Todo = {
        _id: todo._id,
        title: formData.title,
        isfinished: formData.isChecked,
        date: todo.date,
      };
      console.log(temp);
      temp.isfinished = formData.isChecked;
      temp.title = formData.title;
      if (handleUpdateTodo(temp)) {
        toggleState();
      } else {
        //reseting to old state
        setFormData({
          isChecked: todo.isfinished,
          title: todo.title,
        });
      }
    }
  };
  return (
    <motion.div
      layout
      style={{
        backgroundColor: "#dfdfdf",
        marginTop: "1rem",
        borderRadius: ".5rem",
        padding: "0rem 1rem",
      }}
    >
      <AnimatePresence>
        <Stack
          direction="row"
          component={motion.div}
          layout
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row">
            <Checkbox
              checked={formData.isChecked}
              onChange={(e: any) => {
                console.log("form data -->", formData);
                console.log(e.target.checked);

                setFormData((prevstate) => ({
                  ...prevstate,
                  isChecked: e.target.checked,
                }));
                if (!isEditing) toggleState();
              }}
            />
            {!isEditing ? (
              <motion.div
                onClick={toggleState}
                style={{ flexGrow: 1, cursor: "pointer" }}
              >
                <p
                  style={{
                    padding: ".1rem 1rem",
                    textDecorationStyle: "solid",
                    textDecorationLine: formData.isChecked
                      ? "line-through"
                      : "none",
                    color: formData.isChecked ? "gray" : "black",
                  }}
                >
                  {todo.title}
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <TextField
                  variant="standard"
                  onChange={(e: any) => {
                    setFormData((prevstate) => ({
                      ...prevstate,
                      title: e.target.value,
                    }));
                  }}
                  defaultValue={formData.title}
                />
              </motion.div>
            )}
          </Stack>
          {!isEditing ? (
            <IconButton
              onClick={() => {
                handleDelete(todo._id);
              }}
            >
              <DeleteRoundedIcon color="error" />
            </IconButton>
          ) : (
            <IconButton onClick={updateTodo}>
              <DoneAllRoundedIcon color="success" />
            </IconButton>
          )}
        </Stack>
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoTile;
