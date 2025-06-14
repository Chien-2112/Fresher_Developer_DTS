"use strict";

import {
	CREATED,
	OK
} from "../core/success.response.js";
import { UserService } from "../services/user/user.service.js";

class UserController {
	// GET ALL USERS.
	getAllUsers = async(request, response, next) => {
		console.log(`[P]::Get All Users::`);
		new OK({
			message: "Get All Users success!",
			metadata: await UserService.getAllUsers()
		}).send(response);
	}

	// GET USER BY ID.
	getUser = async(request, response, next) => {
		console.log(`[P]::Get User::`);
		new OK({
			message: "Get User success!",
			metadata: await UserService.getUser({ userId: request.params.id })
		}).send(response);
	}

	// UPDATE USER BY ID.
	updateUserById = async(request, response, next) => {
		console.log(`[P]::Update User By Id::`);
		
		new OK({
			message: "Update User success!",
			metadata: await UserService.updateUserById({
				userId: request.params.id,
				updateData: request.body,
				user: request.user
			})
		}).send(response);
	}

	// DELETE USER BY ID.
	deleteUserById = async(request, response, next) => {
		console.log(`[P]::Delete User By Id::`);
		new OK({
			message: "Delete User success!",
			metadata: await UserService.deleteUserById({
				userId: request.params.id,
			})
		}).send(response);
	}
}

const instanceUserController = new UserController();
export { instanceUserController };