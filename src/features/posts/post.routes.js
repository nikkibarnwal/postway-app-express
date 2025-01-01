import express from "express";
import * as PostsController from "./post.controller.js";
import uploadFile from "../../middlewares/uploadFile.middleware.js";

const postRouter = express.Router();

postRouter.get("/all", PostsController.all);

postRouter.get("/:id", PostsController.specificPost);
postRouter.get("/", PostsController.allPostByUser);

postRouter.post(
  "/",
  uploadFile.single("imageUrl"),
  PostsController.createPosts
);

postRouter.put(
  "/:id",
  uploadFile.single("imageUrl"),
  PostsController.updatePosts
);
postRouter.delete("/:id", PostsController.deletePost);

export default postRouter;
