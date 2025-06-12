"use strict";

import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { indexRoute } from "./routes/index.js";

const app = express();

// INIT MIDDLEWARES.
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(
	cors({
		origin: "http://localhost:5001",
		credentials: true
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// INIT ROUTES.
app.use("", indexRoute);

export default app;