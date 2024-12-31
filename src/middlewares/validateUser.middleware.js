import { body, validationResult } from "express-validator";
import { BAD_REQUEST_CODE } from "../utils/common.js";

const validateUser = async (req, res, next) => {
  const rules = [];
  switch (req.path) {
    case "/signup":
      rules.push(
        body("name")
          .isString()
          .withMessage("Name should be string")
          .notEmpty()
          .withMessage("Name is required"),
        body("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Enter valid email"),
        body("password")
          .isString()
          .withMessage("Password should be string")
          .notEmpty()
          .withMessage("Password is required")
          .isLength({ min: 6, max: 20 })
          .withMessage("Password must be between 6 to 20 characters")
      );
      break;
    case "/signin":
      rules.push(
        body("email")
          .notEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Enter valid email"),
        body("password")
          .isString()
          .withMessage("Password should be string")
          .notEmpty()
          .withMessage("Password is required")
          .isLength({ min: 6, max: 20 })
          .withMessage("Password must be between 6 to 20 characters")
      );
      break;
    default:
      break;
  }
  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errMsg = [];
  validationErrors.errors.map((err) => errMsg.push({ [err.path]: err.msg }));
  return res.status(BAD_REQUEST_CODE).json({ success: false, errors: errMsg });
};

export default validateUser;
