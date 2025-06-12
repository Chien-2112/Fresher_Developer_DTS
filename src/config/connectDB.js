"use strict";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectString = process.env.URL_MONGODB;

const connectDB = async() => {
	try {
		const connect = await mongoose.connect(connectString);
		console.log("Connected to MongoDB successed! ",
			connect.connection.host,
			connect.connection.name
		);
	} catch(err) {
		console.error(err);
		process.exit(1);
	}
}

export { connectDB };