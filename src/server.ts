import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import * as morgan from "morgan";

import { configSource } from "./db/config";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundRoute } from "./errors/404.error";
import { PORT } from "./utils/const.util";

configSource
  .initialize()
  .then((res) => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.error("ERROR CONNECTING TO DATABASE: ", err);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);
app.use(errorMiddleware);
app.use(notFoundRoute);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
