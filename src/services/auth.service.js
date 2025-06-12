"use strict";
import { USER } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
	BadRequestError,
	UnauthorizedRequestError
} from "../core/error.response.js";
import { generateRefreshToken } from "../auth/authUtils.js";
import { KeyTokenService } from "./keyToken.service.js";

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
		const validPassword = await bcrypt.compare(
			password, foundUser.password
		);
		if(foundUser && validPassword) {
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

			response.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				maxAge: 72 * 60 * 60 * 1000,
				secure: true,
				path: "/",
				sameSite: "strict"
			});

			return { accessToken };
		} else {
			throw new UnauthorizedRequestError(
				"Email or Password not matched!"
			);
		}
	}
}

export { AuthService };