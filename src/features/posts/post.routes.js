import express from "express";
import * as PostsController from "./post.controller.js";

const postRouter = express.Router();

postRouter.get("/all", PostsController.all);

postRouter.get("/:id", PostsController.specificPost);
postRouter.get("/", PostsController.allPostByUser);

postRouter.post("/", (req, res) => {
  res.send("Create a post");
});

postRouter.put("/:id", (req, res) => {
  res.send("Update a post by id");
});
postRouter.delete("/:id", (req, res) => {
  res.send("Delete a post by id");
});

export default postRouter;
