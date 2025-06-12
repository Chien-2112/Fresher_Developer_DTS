"use strict";

import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

const keyTokenSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	privateKey: {
		type: String,
		require: true,
	},
	publicKey: {
		type: String,
		required: true,
	},
	refreshTokenUsed: {
		type: Array,
		default: []
	},
	refreshToken: {
		type: String,
		required: true
	}
}, {
	collection: COLLECTION_NAME,
	timestamps: true,
});

const KEYTOKEN = model(DOCUMENT_NAME, keyTokenSchema);
export { KEYTOKEN };