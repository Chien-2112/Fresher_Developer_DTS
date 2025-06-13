"use strict";

import jwt from "jsonwebtoken";
import { HEADER } from "../../constants.js";
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedRequestError
} from "../core/error.response.js";
import { KEYTOKEN } from "../models/keyToken.model.js";

const validateToken = async(request, response, next) => {
	let token;
	const userId = request.headers[HEADER.CLIENT_ID];
	if(!userId) {
		throw new UnauthorizedRequestError(
			"You don't have ID to authenticated"
		);
	}
	const keyToken = await KEYTOKEN.findOne({ user_id: userId });
	if(!keyToken) {
		throw new NotFoundError("Key Token not found");
	}
	const { publicKey } = keyToken;

	const refreshToken = request.headers[HEADER.REFRESHTOKEN];
	if(refreshToken) {
		try {
			const decodedUser = jwt.verify(refreshToken, publicKey);
			console.log(decodedUser);

			request.keyToken = keyToken;
			request.user = decodedUser.user;
			request.refreshToken = refreshToken;
			return next();
		}
		catch(err) {
			throw err;
		}
	}
	
	const authHeader = request.headers[HEADER.AUTHORIZATION] || request.headers.authorization;
	if(authHeader && authHeader.startsWith("Bearer")) {
		token = authHeader.split(" ")[1];
		try {
			const decodedUser = jwt.verify(token, publicKey);
			console.log(decodedUser);

			request.user = decodedUser.user;
			request.keyToken = keyToken;
			return next();
		}
		catch(err) {
			throw err;
		}
	} else {
		throw new UnauthorizedRequestError(
			"You're not authorized to access this route"
		);
	}
}

export { validateToken };