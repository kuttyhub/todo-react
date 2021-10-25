const cros = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// local import
const routes = require("./routes/todo.js");

//evironment
const db_path = process.env.DB_URL || "mongodb://localhost:27017";
const port = process.env.PORT || 3001;

console.log(process.env.DB_URL);
//middlewares

app.use(cros());
app.use(express.json());
app.use("/api", routes);

console.log(db_path);
//connect to db
mongoose
  .connect(`${db_path}/todo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello..there");
});

app.listen(port, () => console.log(`listening to port ${port}`));
