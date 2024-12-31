import express from "express";

const postRouter = express.Router();

postRouter.get("/all", (req, res) => {
  res.send("Read all posts");
});
postRouter.get("/:id", (req, res) => {
  res.send("Read single posts");
});
postRouter.get("/", (req, res) => {
  res.send("Read all posts according to the logged in user");
});

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
