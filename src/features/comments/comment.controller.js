import CustomErrorHandler from "../../error/CustomErrorHandler.js";
import { NOT_FOUND_CODE, SUCCESS_CODE } from "../../utils/common.js";
import * as CommentModel from "./comment.model.js";

/** get all comments for specific post*/
export const allComments = (req, res) => {
  const postId = req.params.id;
  const { page, limit } = req.query;
  const comments = CommentModel.getByPostId(postId, page, limit);
  if (comments.length > 0) {
    res
      .status(SUCCESS_CODE)
      .json({ success: true, data: comments, message: "Comments found" });
  } else {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "No comments found");
  }
};

/** create a new comment for specific post */
export const createComment = (req, res) => {
  /**userId is coming from jwt auth middleware */
  const userId = req.user.id;
  const commentData = {
    content: req.body.content,
    userId: userId,
    postId: req.params.id,
  };
  const newComment = CommentModel.create(commentData);
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: newComment, message: "Comment added" });
};

/** update a comment */
export const updateComment = (req, res) => {
  /**userId is coming from jwt auth middleware */
  const commentId = req.params.id;
  const comment = req.body.content;
  const updatedComment = CommentModel.update(commentId, comment);
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: updatedComment, message: "Comment updated" });
};

/* delete a comments */
export const deleteComment = (req, res) => {
  const commentId = req.params.id;
  CommentModel.deleteComment(commentId);
  res.status(SUCCESS_CODE).json({ success: true, message: "Comment deleted" });
};
