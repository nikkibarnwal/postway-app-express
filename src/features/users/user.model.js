import { uid } from "../../utils/common.js";

/** Array of users */
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    password: "password1",
  },
  {
    id: 2,
    name: "Nikki Doe",
    email: "nikki@gmail.com",
    password: "1234567",
  },
]; // array of users

/** get all users */
export const get = () => users;

/** get user by id */
export const getById = (id) => users.find((user) => user.id === id);

/** find user by email and password */
export const findByCredentials = (email, password) =>
  users.find((user) => user.email === email && user.password === password);

/** create a new user */
export const create = (user) => {
  user.id = uid();
  users.push(user);
  return user;
};
