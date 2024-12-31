/**1 import required packages */
import express from "express";
import { configDotenv } from "dotenv";
import userRouter from "./src/features/users/user.routes.js";
import postRouter from "./src/features/posts/post.routes.js";
import commentRouter from "./src/features/comments/comment.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
import jwtAuthMiddleware from "./src/middlewares/jwtAuth.middleware.js";

/**2 create an express app */
const app = express();
configDotenv();

/**2.1 parse the incoming JSON data */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**3 create routes */

/**3.1 default route for home page */
app.get("/", (req, res) => {
  res.send("Welcome to postway social media app");
});

/**3.2 route for user management */
app.use("/api/", userRouter);

/**3.3 route for post management */
app.use("/api/posts", jwtAuthMiddleware, postRouter);

/**3.4 route for comment management */
app.use("/api/comments", jwtAuthMiddleware, commentRouter);

/**3.5 route for like management */
app.use("/api/likes", jwtAuthMiddleware, likeRouter);

/**4 start the server at given port */
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} \nhttp://localhost:${process.env.PORT}`
  );
});
