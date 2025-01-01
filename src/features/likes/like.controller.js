import { SUCCESS_CODE } from "../../utils/common.js";
import * as LikeModel from "./like.model.js";

/** get all likes by post id */
export const getLikesByPostId = (req, res) => {
  const postId = req.params.id;
  const likes = LikeModel.get(postId);
  if (likes.length === 0) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "No likes found");
  }
  res.status(SUCCESS_CODE).json({
    success: true,
    data: likes,
    message: "Likes found",
  });
};

/** toggle like on a specific post */
export const toggleSpecificLike = (req, res) => {
  /**userId is coming from jwt auth middleware */
  const userId = req.user.id;
  const postId = req.params.id;
  const like = LikeModel.toggleLike(userId, postId);
  res.status(SUCCESS_CODE).json({
    success: true,
    data: like,
    message: "Like toggled",
  });
};
