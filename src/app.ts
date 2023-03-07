import express, { Application } from "express";

import "express-async-errors";
import { handleErrors } from "./error";
import categoryRouters from "./routers/category.routers";
import loginRouter from "./routers/login.routers";
import userRouters from "./routers/user.routers";

const app: Application = express();
app.use(express.json());

app.use("/users", userRouters);
app.use("/login", loginRouter);
app.use("/categories", categoryRouters);

app.use(handleErrors);

export default app;
