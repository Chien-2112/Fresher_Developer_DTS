"use strict";
import { USER } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
	BadRequestError,
	UnauthorizedRequestError
} from "../core/error.response.js";
import { 
	generateAccessToken, 
	generateRefreshToken 
} from "../auth/authUtils.js";
import { KeyTokenService } from "./keyToken.service.js";
import crypto from "crypto";

const SALT_ROUND = 10;

class AuthService {
	// SIGNUP SERVICE.
	static signUp = async({ name, username, email, password, phone }) => {		
		const availableUser = await USER.findOne({ email }).lean();
		if(availableUser) {
			throw new BadRequestError("Error: User already registered!");
		}
		const salt = await bcrypt.genSalt(SALT_ROUND);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await USER.create({
			name, username, email,
			password: hashedPassword,
			phone
		});
		if(newUser) {
			return {
				newUser: newUser 
			}
		}
	}

	// SIGNIN SERVICE.
	static signIn = async({ email, password, response }) => {
		const foundUser = await USER.findOne({ email }).lean();
		if(!foundUser) {
			throw new BadRequestError("Email is not valid");
		}
		const validPassword = await bcrypt.compare(
			password, foundUser.password
		);
		if(validPassword) {
			const { _id: userId, email } = foundUser;
			const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
				modulusLength: 4096,
				privateKeyEncoding: { type: "pkcs1", format: "pem" },
				publicKeyEncoding: { type: "pkcs1", format: "pem" }
			});

			const accessToken = generateAccessToken({
				payload: {
					user: { userId, email }
				},
				privateKey
			});
			const refreshToken = generateRefreshToken({
				payload: {
					user: { userId, email }
				},
				privateKey
			});
			console.log({ accessToken, refreshToken });

			await KeyTokenService.createKeyToken({
				userId, privateKey, publicKey, refreshToken
			});

			return { accessToken, refreshToken };
		} else {
			throw new UnauthorizedRequestError(
				"Password not matched!"
			);
		}
	}

	// LOGOUT SERVICE.
	static logOut = async({ userId }) => {
		console.log(userId);
		const deleteKey = await KeyTokenService.removeKeyById(userId);
		return deleteKey;
	}

	// REFRESH TOKEN SERVICE.
	static handleRefreshToken = async({ keyToken, user, refreshToken }) => {
		const { userId, email } = user;

		if(keyToken.refreshTokenUsed.includes(refreshToken)) {
			await KeyTokenService.deleteKeyById(userId); 
			throw new BadRequestError("Something wrong happen!! Please relogin");
		}

		if(keyToken.refreshToken !== refreshToken) {
			throw new UnauthorizedRequestError("User is not logged in");
		}

		const { privateKey } = keyToken;
		const newAccessToken = generateAccessToken({ payload: { user: { userId, email }}, privateKey });
		const newRefreshToken = generateRefreshToken({ payload: { user: { userId, email }}, privateKey });
		
		await KeyTokenService.updateRefreshToken(userId, refreshToken, newRefreshToken);
		return { newAccessToken, newRefreshToken };
	}
}

export { AuthService };