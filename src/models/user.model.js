"use strict";
import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userShema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: String,
	avatar: String,
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	status: {
		type: String,
		enum: ["active", "inactive"],
		default: 'inactive'
	},
	deleted: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true,
	collection: COLLECTION_NAME
});


const USER = model(DOCUMENT_NAME, userSchema);
export { USER };