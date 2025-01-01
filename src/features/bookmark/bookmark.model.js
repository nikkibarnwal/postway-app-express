import CustomErrorHandler from "../../error/CustomErrorHandler.js";
import { currentDateTime, NOT_FOUND_CODE, uid } from "../../utils/common.js";
import * as PostModel from "../posts/post.model.js";

const bookMarks = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    createdAt: "2025-01-01T04:02:30.389Z",
  },
  {
    id: 2,
    userId: 1,
    postId: 2,
    createdAt: "2025-01-01T05:02:30.389Z",
  },
  {
    id: 3,
    userId: 2,
    postId: 2,
    createdAt: "2025-01-01T06:02:30.389Z",
  },
  {
    id: 4,
    userId: 2,
    postId: 3,
    createdAt: "2025-01-01T03:02:30.389Z",
  },
];

export const getByUserId = (userId) =>
  bookMarks.filter((bookmark) => Number(bookmark.userId) === Number(userId));

export const toggle = (userId, postId) => {
  const index = bookMarks.findIndex(
    (bookmark) =>
      Number(bookmark.userId) === Number(userId) &&
      Number(bookmark.postId) === Number(postId)
  );
  if (index === -1) {
    const postAvailable = PostModel.getById(postId);
    if (postAvailable === undefined) {
      throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
    }
    const newBookmark = {
      id: uid(),
      userId,
      postId,
      createdAt: currentDateTime(),
    };
    bookMarks.push(newBookmark);
    return newBookmark;
  } else {
    const removedBookMark = bookMarks.splice(index, 1);
    return removedBookMark[0];
  }
};
