import express from "express";

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  res.send("Welcome to social media app");
});
userRouter.post("/signin", (req, res) => {
  res.send("Welcome to social media app");
});

export default userRouter;
