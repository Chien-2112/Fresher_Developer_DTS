"use strict";

import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRoute } from "./routes/index.js";

const app = express();

// INIT MIDDLEWARES.
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(
	cors({
		origin: "http://localhost:5000",
		credentials: true
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// INIT ROUTES.
app.use("", indexRoute);

// INIT DATABASE.
import { connectDB } from "./config/connectDB.js";
connectDB();

// HANDLING ERROR.
app.use((request, response, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, request, response, next) => {
	const statusCode = err.status || 500;
	return response.status(statusCode).json({
		status: "error",
		code: statusCode,
		stack: err.stack,
		message: err.message || "Internal Server Error"
	})
})

export default app;