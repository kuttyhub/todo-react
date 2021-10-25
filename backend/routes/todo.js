const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//class
const Todos = mongoose.model(
  "todo",
  mongoose.Schema({
    title: String,
    isfinished: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() },
  })
);

// router.get("/", (req, res) => res.send("datas"));
router.get("/", (req, res) => res.send("redirect to --> gettodo || addtodo"));

//add todo
router.post("/addTodo", async (request, response) => {
  try {
    const user = new Todos(request.body);
    console.log("request-->", request.body);
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

//update todo
router.put("/modifyTodo", async (req, res) => {
  const result = await Todos.findByIdAndUpdate(
    { _id: req.body._id },
    {
      title: req.body.title,
      isfinished: req.body.isfinished,
    },
    { returnOriginal: false }
  );

  try {
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//delete todo
router.delete("/deleteTodo", async (req, res) => {
  const result = await Todos.findByIdAndRemove({ _id: req.body.id });
  try {
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// get all records
router.get("/getTodos", async (req, res) => {
  const results = await Todos.find({}).select({ __v: 0 });

  try {
    res.send(results);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//get iddate
router.get("/getDate/:id", (req, res) =>
  res.send(mongoose.Types.ObjectId(req.params.id).getTimestamp())
);

module.exports = router;
