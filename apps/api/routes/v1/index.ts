import { Router } from "express";
import usersRouter from "./users.ts";
import websitesRouter from "./websites.ts";

const v1Router = Router();

v1Router.use("/users", usersRouter);
v1Router.use("/websites", websitesRouter);

export default v1Router;