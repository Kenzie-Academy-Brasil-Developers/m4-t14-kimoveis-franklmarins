import express, { Application } from "express";

import "express-async-errors";
import { handleErrors } from "./error";

const app: Application = express();
app.use(express.json());

app.use(handleErrors);

export default app;
