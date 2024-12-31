import jwt from "jsonwebtoken";

const jwtAuthMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res
      .status(process.env.UNAUTHORIZED_CODE)
      .json({ success: false, message: "Access denied" });
  }
  try {
    token = token.split(" ")[1].trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(process.env.UNAUTHORIZED_CODE)
      .json({ success: false, message: "Invalid token" });
  }
};

export default jwtAuthMiddleware;
