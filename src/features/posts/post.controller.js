import {
  INTERNAL_SERVER_ERROR_CODE,
  SUCCESS_CODE,
} from "../../utils/common.js";
import * as PostModel from "./post.model.js";

export const all = (req, res) => {
  try {
    const posts = PostModel.get();
    res.status(SUCCESS_CODE).json({ success: true, data: posts });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .send({ success: false, message: error.message });
  }
};
