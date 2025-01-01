/**1 import required packages */
import express from "express";
import { configDotenv } from "dotenv";
import userRouter from "./src/features/users/user.routes.js";
import postRouter from "./src/features/posts/post.routes.js";
import commentRouter from "./src/features/comments/comment.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
import jwtAuthMiddleware from "./src/middlewares/jwtAuth.middleware.js";
import errorHandlerMiddleware from "./src/middlewares/errorHandler.middleware.js";
import invalidRoutesMiddleware from "./src/middlewares/invalidRoutes.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";

/**2 create an express app */
const app = express();
configDotenv();

/**2.1 parse the incoming JSON data */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**2.2 create a middleware to log the incoming request */
app.use(loggerMiddleware);

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

/**3.6 Middleware to error handling */
app.use(errorHandlerMiddleware);

/**3.7 Middleware to handle invalid routes */
app.use(invalidRoutesMiddleware);

/**4 start the server at given port */
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} \nhttp://localhost:${process.env.PORT}`
  );
});
