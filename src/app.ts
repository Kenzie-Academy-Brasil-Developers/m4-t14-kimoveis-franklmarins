import express, { Application } from "express";

import "express-async-errors";
import { handleErrors } from "./error";
import userRouters from "./routers/user.routers";

const app: Application = express();
app.use(express.json());

app.use("/users", userRouters);

app.use(handleErrors);

export default app;
