import express from "express";
import * as CommentController from "./comment.controller.js";

const commentRouter = express.Router();

/**Here id will be post id */
/* get all comments for specific post*/
commentRouter.get("/:id", CommentController.allComments);

/**Here id will be post id */
/* Create a comment for specific post*/
commentRouter.post("/:id", CommentController.createComment);

/**Here id will be comment id */
/* Delete a comment for specific post*/
commentRouter.delete("/:id", CommentController.deleteComment);

/**Here id will be comment id */
/* Update a comment for specific post*/
commentRouter.put("/:id", CommentController.updateComment);

export default commentRouter;
