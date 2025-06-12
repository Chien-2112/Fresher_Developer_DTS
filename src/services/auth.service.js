"use strict";
import { USER } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
	BadRequestError
} from "../core/error.response.js";

class AuthService {
	// SIGNUP SERVICE.
	static signUp = async({ name, username, email, password, phone }) {
		const availableUser = await USER.findOne({ email }).lean();
		if(availableUser) {
			throw new BadRequestError("Error: User already registered!");
		}
	}
}