import "express-async-errors";
import express, { Application } from "express";
import { userRoutes } from "./routers/users.routes";
import { errorHandler } from "./errors/users.errors";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("", userRoutes);

app.use(errorHandler);

export default app;
