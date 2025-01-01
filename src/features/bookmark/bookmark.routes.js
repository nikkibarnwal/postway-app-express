import express from "express";
import * as BookmarkController from "./bookmark.controller.js";

const bookmarkRouter = express.Router();

bookmarkRouter.get("/", BookmarkController.all);
bookmarkRouter.get("/toggle/:id", BookmarkController.toggleBookmark);

export default bookmarkRouter;
