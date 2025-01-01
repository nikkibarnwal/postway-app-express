import path from "path";

export const uid = () => Date.now() + Math.floor(Math.random() * 1000000000);

export const currentDateTime = () => new Date().toISOString();

/**write a function to apply pagination based on the provided posts array */
export const paginate = (posts, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return posts.slice(startIndex, endIndex);
};

export const imagesPath = path.join(path.resolve(), "uploads");

/**Status Codes*/
export const SUCCESS_CODE = 200;
export const CREATED_CODE = 201;
export const NO_CONTENT_CODE = 204;
export const BAD_REQUEST_CODE = 400;
export const UNAUTHORIZED_CODE = 401;
export const FORBIDDEN_CODE = 403;
export const NOT_FOUND_CODE = 404;
export const CONFLICT_CODE = 409;
export const INTERNAL_SERVER_ERROR_CODE = 500;

export const DONT_LOG = ["/favicon.ico", "signup", "signin"];
