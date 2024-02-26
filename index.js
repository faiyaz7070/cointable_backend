require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


const Connection = require("./config/db");
const  userRouter  = require("./routes/user");
const postRouter  = require("./routes/post");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Welcome to cointab assignment");
});

app.listen(4500, async () => {
  try {
    console.log(`Server is running on http://localhost 4500`);
    console.log("DB is connected");
    await Connection;
  } catch (error) {
    console.log(error.message);
  }
});
