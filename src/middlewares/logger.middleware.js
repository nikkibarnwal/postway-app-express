import winston from "winston";
import { DONT_LOG } from "../utils/common.js";

/**create logger by winston package */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "combined.log", level: "info" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

/**create a middleware to log the incoming request */

const loggerMiddleware = (req, res, next) => {
  const lastUrlPart = req.url.split("/").pop();
  if (DONT_LOG.includes(lastUrlPart)) {
    return next();
  }
  logger.info({
    time: new Date().toString(),
    method: req.method,
    url: req.url,
    body: JSON.stringify(req.body),
    query: JSON.stringify(req.query),
  });
  next();
};

export default loggerMiddleware;
