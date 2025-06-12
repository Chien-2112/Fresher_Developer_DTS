"use strict";

import app from "./src/app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`My Webserver is running on port ${PORT}`);
});

process.on("SIGINT", () => {
	server.close(async() => {
		await mongoose.disconnect();
		console.log("Disconnected DB!");
		console.log("Exit Server Express");
		process.exit(0);
	})
})