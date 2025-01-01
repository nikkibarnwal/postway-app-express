import CustomErrorHandler from "../error/CustomErrorHandler.js";
import { INTERNAL_SERVER_ERROR_CODE } from "../utils/common.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  } else {
    // console.error(err);
    return res.status(INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: "Oops! Something went wrong please try again later",
    });
  }
};

export default errorHandlerMiddleware;
