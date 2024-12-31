/**1 import required packages */
import express from "express";
import { configDotenv } from "dotenv";

/**2 create an express app */
const app = express();
configDotenv();

/**3 create a route */

app.get("/", (req, res) => {
  res.send("Welcome to social media app");
});

/**4 start the server */
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} \nhttp://localhost:${process.env.PORT}`
  );
});
