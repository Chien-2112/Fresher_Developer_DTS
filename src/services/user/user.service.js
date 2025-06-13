"use strict";
import { USER } from "../../models/user.model.js";
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedRequestError
} from "../../core/error.response.js";

class UserService {
	// GET ALL USERS.
	static getAllUsers = async() => {
		try {
			const users = await USER.find().lean();
			return users;
		} catch(err) {
			throw new BadRequestError("Failed to fetch users");
		}
	}

	// GET ONE USER BY ID.
	static getUser = async({ userId }) => {
		if(!Types.ObjectId.isValid(userId)) {
			throw new BadRequestError("Invalid user ID format");
		}
		const user = await USER.findById(userId).lean();
		if(!user) throw new NotFoundError("User not found");
		return user;
	}

	// UPDATE USER BY ID.
	static updateUserById = async({ userId, updateData }) => {
		if(!Types.ObjectId.isValid(userId)) {
			throw new BadRequestError("Invalid user ID format");
		}
		const updatedUser = await USER.findByIdAndUpdate(
			{ _id: userId, deleted: false },
			updateData,
			{ new: true }
		).lean();

		if(!updatedUser) throw new NotFoundError("User not found to update!");
		return updatedUser;
	}

	// DELETE USER BY ID.
	static deleteUserById = async({ userId }) => {
		if(!Types.ObjectId.isValid(userId)) {
			throw new BadRequestError("Invalid user ID format");
		}
		const deletedUser = await USER.findOneAndUpdate(
			{ _id: userId, deleted: false },
			{ deleted: true },
			{ new: true }
		).lean();

		if(!deletedUser) throw new NotFoundError("User not found to delete");
		return deletedUser;
	}
}

export { UserService };