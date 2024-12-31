import express from "express";

const commentRouter = express.Router();

commentRouter.get("/:id", (req, res) => {
  res.send("Read all comments for specific post");
});
commentRouter.post("/:id", (req, res) => {
  res.send("Create a comment for specific post");
});
commentRouter.delete("/:id", (req, res) => {
  res.send("Delete a comment for specific post");
});
commentRouter.put("/:id", (req, res) => {
  res.send("Update a comment for specific post");
});

export default commentRouter;
