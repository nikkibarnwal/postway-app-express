import { NOT_FOUND_CODE } from "../utils/common.js";

const invalidRoutesMiddleware = (req, res, next) => {
  res.status(NOT_FOUND_CODE).json({ success: false, message: "Invalid route" });
};

export default invalidRoutesMiddleware;
