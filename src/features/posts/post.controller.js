import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
} from "../../utils/common.js";
import * as PostModel from "./post.model.js";
import CustomErrorHandler from "../../error/CustomErrorHandler.js";

/** get all post doesn't depend on user */
export const all = (req, res) => {
  const posts = PostModel.get();
  res.status(SUCCESS_CODE).json({ success: true, data: posts });
};

/** get specific post by post id */
export const specificPost = (req, res) => {
  const { id } = req.params;
  const post = PostModel.getById(id);
  if (!post) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
  }
  res.status(SUCCESS_CODE).json({ success: true, data: post });
};

/**get all post for specific logged-in users */
export const allPostByUser = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const { id } = req.user;
  const posts = PostModel.getByUserId(id);
  if (posts.length === 0) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "No post found for this user");
  }
  res.status(SUCCESS_CODE).json({ success: true, data: posts });
};

export const createPosts = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const { id } = req.user;
  const { caption } = req.body;
};
