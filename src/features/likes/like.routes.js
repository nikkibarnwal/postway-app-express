import express from "express";
import * as LikeController from "./like.controller.js";

const likeRouter = express.Router();

/** get all likes for a post id */
likeRouter.get("/:id", LikeController.getLikesByPostId);

/** toggle like on a specific post */
likeRouter.get("/toggle/:id", LikeController.toggleSpecificLike);

export default likeRouter;
