import {
  BAD_REQUEST_CODE,
  CREATED_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
} from "../../utils/common.js";
import * as PostModel from "./post.model.js";
import CustomErrorHandler from "../../error/CustomErrorHandler.js";

/** get all post doesn't depend on user */
export const all = (req, res) => {
  const { page, limit } = req.query;
  const posts = PostModel.get(page, limit);
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: posts, message: "Posts found" });
};

/** get specific post by post id */
export const specificPost = (req, res) => {
  const { id } = req.params;
  const post = PostModel.getById(id);
  if (!post) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
  }
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: post, message: "Post found" });
};

/**get all post for specific logged-in users */
export const allPostByUser = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const { id } = req.user;
  const { page, limit } = req.query;
  const posts = PostModel.getByUserId(id, page, limit);
  if (posts.length === 0) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "No post found for this user");
  }
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: posts, message: "Posts found" });
};

/** create a new post */
export const createPosts = (req, res) => {
  if (!req.file) {
    throw new CustomErrorHandler(BAD_REQUEST_CODE, "No file uploaded.");
  }
  /** get the user id from the request object by jwt middleware */
  const { id } = req.user;
  const { caption } = req.body;
  const imageUrl = req.file.filename;
  const newpost = PostModel.create({ userId: id, caption, imageUrl });
  res
    .status(CREATED_CODE)
    .json({ success: true, data: newpost, message: "Post created" });
};

/** update a post */
export const updatePosts = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const userId = req.user.id;
  const { id } = req.params;
  const { caption } = req.body;
  const imageUrl = req.file.filename;

  const updatedPost = PostModel.update(userId, id, { caption, imageUrl });
  if (!updatedPost) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
  }
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: updatedPost, message: "Post updated" });
};

/** delete a post */
export const deletePost = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const userId = req.user.id;
  const { id } = req.params;
  const isDeleted = PostModel.remove(userId, id);
  if (!isDeleted) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
  }
  res.status(SUCCESS_CODE).json({ success: true, message: "Post deleted" });
};

/** filter posts by caption */
export const filterPosts = (req, res) => {
  const { caption, page, limit } = req.query;
  if (!caption || caption.length < 3) {
    throw new CustomErrorHandler(
      BAD_REQUEST_CODE,
      "Caption length should be at least 3 characters"
    );
  }
  const posts = PostModel.filterByCaption(caption, page, limit);
  if (posts.length === 0) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "No post found");
  }
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: posts, message: "Posts found" });
};

/** save a post as a draft */
export const draft = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const userId = req.user.id;
  const { id } = req.params;
  const post = PostModel.saveAsDraft(userId, id);
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: post, message: "Post saved as draft" });
};

/** archive a post */
export const archive = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const userId = req.user.id;
  const { id } = req.params;
  const post = PostModel.archive(userId, id);
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: post, message: "Post archived" });
};

/**sort by date */
export const sortPosts = (req, res) => {
  const { page, limit } = req.query;
  const { type } = req.params;
  let posts;
  let sortedby = "enggagement";
  if (type == "date") {
    sortedby = "date";
    posts = PostModel.sortBasedOnDate(page, limit);
  } else {
    posts = PostModel.sortBasedOnEngagement(page, limit);
  }

  res.status(SUCCESS_CODE).json({
    success: true,
    data: posts,
    message: `Posts sorted by ${sortedby}`,
  });
};
