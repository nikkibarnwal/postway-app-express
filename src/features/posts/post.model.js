import { uid } from "../../utils/common.js";

const posts = [
  {
    id: 1,
    userId: 1,
    caption: "Post 1",
    imageUrl: "This is the content of post 1",
  },
  {
    id: 2,
    userId: 1,
    caption: "Post 2",
    imageUrl: "This is the content of post 2",
  },
  {
    id: 3,
    userId: 2,
    caption: "Post 3",
    imageUrl: "This is the content of post 3",
  },
  {
    id: 4,
    userId: 2,
    caption: "Post 4",
    imageUrl: "This is the content of post 4",
  },
];

/** get all posts */
export const get = () => posts;

/** get posts by postid */
export const getById = (postId) =>
  posts.find((post) => Number(post.id) === Number(postId));

/** get posts by userid */
export const getByUserId = (userId) =>
  posts.filter((post) => Number(post.userId) === Number(userId));

/** create a new post */
export const create = (post) => {
  const newPost = { id: uid(), ...post };
  posts.push(newPost);
  return newPost;
};

/** update a post */
export const update = (userId, postId, post) => {
  const index = posts.findIndex(
    (post) =>
      Number(post.id) === Number(postId) &&
      Number(post.userId) === Number(userId)
  );

  if (index !== -1) {
    posts[index] = { ...posts[index], ...post };
    return posts[index];
  }
  return null;
};

/** delete a post */
export const remove = (userId, postId) => {
  const index = posts.findIndex(
    (post) =>
      Number(post.id) === Number(postId) &&
      Number(post.userId) === Number(userId)
  );
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  return false;
};
