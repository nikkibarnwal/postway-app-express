import CustomErrorHandler from "../../error/CustomErrorHandler.js";
import { NOT_FOUND_CODE, SUCCESS_CODE } from "../../utils/common.js";
import * as BookmarkModel from "./bookmark.model.js";

export const all = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const userId = req.user.id;
  const bookmarks = BookmarkModel.getByUserId(userId);
  if (bookmarks.length === 0) {
    throw new CustomErrorHandler(
      NOT_FOUND_CODE,
      "No bookmarks found for this user"
    );
  }
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: bookmarks, message: "Bookmarks found" });
};

export const toggleBookmark = (req, res) => {
  /** get the user id from the request object by jwt middleware */
  const userId = req.user.id;
  const { id } = req.params;
  const bookmark = BookmarkModel.toggle(userId, id);
  res
    .status(SUCCESS_CODE)
    .json({ success: true, data: bookmark, message: "Bookmark toggled" });
};
