import CustomErrorHandler from "../../error/CustomErrorHandler.js";
import { NOT_FOUND_CODE, paginate, uid } from "../../utils/common.js";
import * as PostsModel from "../posts/post.model.js";
const comments = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    content: "This is a great post",
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
    content: "This is a great post",
  },
  {
    id: 3,
    userId: 1,
    postId: 2,
    content: "This is a great post",
  },
  {
    id: 4,
    userId: 2,
    postId: 2,
    content: "This is a great post",
  },
];

/** get all comments by postid */
export const getByPostId = (postId, page, limit) => {
  const post = PostsModel.getById(postId);
  if (post === undefined) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
  } else {
    const filteredComments = comments.filter(
      (comment) => Number(comment.postId) === Number(postId)
    );
    return paginate(filteredComments, page, limit);
  }
};

/** get specific comments by comments id */
export const getById = (commentId) =>
  comments.find((comment) => Number(comment.id) === Number(commentId));

/** create a new comment */
export const create = (comment) => {
  const isPostExist = PostsModel.getById(comment.postId);
  if (isPostExist === undefined) {
    throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
  } else {
    const newComment = { id: uid(), ...comment };
    comments.push(newComment);
    return newComment;
  }
};

/** update a comment */
export const update = (commentId, comment) => {
  /** check if the comment exists by comments id */
  const index = comments.findIndex((c) => Number(c.id) === Number(commentId));
  if (index !== -1) {
    comments[index] = { ...comments[index], content: comment };
    return comments[index];
  }
  throw new CustomErrorHandler(NOT_FOUND_CODE, "Comment not found");
};

/** delete a comment by comment id*/
export const deleteComment = (commentId) => {
  /** check if the comment exists */
  const index = comments.findIndex((c) => Number(c.id) === Number(commentId));
  if (index !== -1) {
    comments.splice(index, 1);
    return true;
  }
  throw new CustomErrorHandler(NOT_FOUND_CODE, "Comment not found");
};
