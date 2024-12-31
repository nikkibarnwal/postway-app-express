import exp from "constants";
import express from "express";

const likeRouter = express.Router();

likeRouter.get("/:id", (req, res) => {
  res.send("get all likes for a post");
});
likeRouter.get("/toggle/:id", (req, res) => {
  res.send("toggle like for a post");
});

export default likeRouter;
