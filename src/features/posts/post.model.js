import CustomErrorHandler from "../../error/CustomErrorHandler.js";
import {
  currentDateTime,
  NOT_FOUND_CODE,
  paginate,
  uid,
} from "../../utils/common.js";
import * as CommentModel from "../comments/comment.model.js";

const posts = [
  {
    id: 1,
    userId: 1,
    caption: "Post 1",
    imageUrl: "This is the content of post 1",
    createdAt: "2025-01-01T04:02:30.389Z",
  },
  {
    id: 2,
    userId: 1,
    caption: "Post 2",
    imageUrl: "This is the content of post 2",
    createdAt: "2025-01-01T05:02:30.389Z",
  },
  {
    id: 3,
    userId: 2,
    caption: "Post 3",
    imageUrl: "This is the content of post 3",
    createdAt: "2025-01-01T06:02:30.389Z",
  },
  {
    id: 4,
    userId: 2,
    caption: "Post 4",
    imageUrl: "This is the content of post 4",
    createdAt: "2025-01-01T03:02:30.389Z",
  },
];

/** get all posts */
export const get = (page, limit) => paginate(posts, page, limit);

/** get posts by postid */
export const getById = (postId) =>
  posts.find((post) => Number(post.id) === Number(postId));

/** get posts by userid */
export const getByUserId = (userId, page, limit) => {
  const filteredPosts = posts.filter(
    (post) => Number(post.userId) === Number(userId)
  );
  return paginate(filteredPosts, page, limit);
};

/** get posts by userid and postid */
export const getByUserIdAndPostId = (userId, postId) =>
  posts.findIndex(
    (post) =>
      Number(post.id) === Number(postId) &&
      Number(post.userId) === Number(userId)
  );

/** create a new post */
export const create = (post) => {
  const newPost = { id: uid(), createdAt: currentDateTime(), ...post };
  posts.push(newPost);
  return newPost;
};

/** update a post */
export const update = (userId, postId, post) => {
  const index = getByUserIdAndPostId(userId, postId);

  if (index !== -1) {
    posts[index] = { ...posts[index], ...post };
    return posts[index];
  }
  return null;
};

/** delete a post */
export const remove = (userId, postId) => {
  const index = getByUserIdAndPostId(userId, postId);
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  return false;
};

/** filter posts by caption */
export const filterByCaption = (caption, page, limit) => {
  const filteredPosts = posts.filter((post) =>
    post.caption.toLowerCase().includes(caption.toLowerCase())
  );
  return paginate(filteredPosts, page, limit);
};

/* Add a feature to save a post as a draft and to archive a post. */
/** save a post as a draft */
export const saveAsDraft = (userId, postId) => {
  const index = getByUserIdAndPostId(userId, postId);
  if (index !== -1) {
    posts[index].draft = true;
    return posts[index];
  }
  throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
};

/** archive a post */
export const archive = (userId, postId) => {
  const index = getByUserIdAndPostId(userId, postId);

  if (index !== -1) {
    posts[index].archive = true;
    return posts[index];
  }
  throw new CustomErrorHandler(NOT_FOUND_CODE, "Post not found");
};

/** sort by date */
export const sortBasedOnDate = (page, limit) => {
  const sortedDatePosts = posts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return paginate(sortedDatePosts, page, limit);
};

/** sort by user engagement */
export const sortBasedOnEngagement = (page, limit) => {
  const postsWithComments = posts.map((post) => {
    const allComments = CommentModel.getByPostId(post.id);
    post.comments = allComments.length;
    return post;
  });

  const sortedPosts = postsWithComments.sort((a, b) => b.comments - a.comments);
  return paginate(sortedPosts, page, limit);
};
