import {
  BAD_REQUEST_CODE,
  CREATED_CODE,
  NOT_FOUND_CODE,
  SUCCESS_CODE,
} from "../../utils/common.js";
import * as UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export const registration = (req, res) => {
  try {
    const user = req.body;
    const newUser = UserModel.create(user);
    res.status(CREATED_CODE).json({ success: true, data: newUser });
  } catch (error) {
    res
      .status(BAD_REQUEST_CODE)
      .json({ success: false, message: error.message });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const user = UserModel.findByCredentials(email, password);
    if (!user) {
      return res
        .status(BAD_REQUEST_CODE)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(SUCCESS_CODE).json({ success: true, token });
  } catch (error) {
    res.status(NOT_FOUND_CODE).json({ success: false, message: error.message });
  }
};
