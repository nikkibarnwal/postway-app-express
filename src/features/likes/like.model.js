import CustomErrorHandler from "../../error/CustomErrorHandler.js";
import { currentDateTime, NOT_FOUND_CODE, uid } from "../../utils/common.js";
import * as PostModel from "../posts/post.model.js";
const likes = [
  {
    id: 1,
    userId: 1,
    postId: 1,
  },
  {
    id: 2,
    userId: 2,
    postId: 1,
  },
  {
    id: 3,
    userId: 1,
    postId: 2,
  },
  {
    id: 4,
    userId: 2,
    postId: 2,
  },
];
/** get all likes by postid */
export const get = (postId) =>
  likes.filter((like) => Number(like.postId) === Number(postId));

/** get specific likes by like id */
export const getById = (likeId) =>
  likes.find((like) => Number(like.id) === Number(likeId));

/**toggle like on a specific post */
export const toggleLike = (userId, postId) => {
  const index = likes.findIndex(
    (like) =>
      Number(like.userId) === Number(userId) &&
      Number(like.postId) === Number(postId)
  );
  /** if like exists then remove it */
  if (index !== -1) {
    const postAvailable = PostModel.getById(postId);
    if (postAvailable === undefined) {
      throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
    }
    const deletedLikes = likes.splice(index, 1);
    return deletedLikes[0];
  } else {
    /** if like does not exist then add it */
    const newLike = { id: uid(), likeAt: currentDateTime(), userId, postId };
    likes.push(newLike);
    return newLike;
  }
};
