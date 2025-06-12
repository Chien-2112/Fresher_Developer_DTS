"use strict";
import { AuthService } from "../services/auth.service.js";
import { CREATED, OK } from "../core/success.response.js";

class AuthController {
	// SIGNUP.
	signUp = async(request, response, next) => {
		console.log(`[P]::signUp::`, request.body);
		new CREATED({
			message: "Registered Successfully!",
			metadata: await AuthService.signUp(request.body)
		}).send(response);
	}

	// SIGNIN
	signIn = async(request, response, next) => {
		console.log(`[P]::signIn:`, request.body);
		new OK({
			message: "Login successfully",
			metadata: await AuthService.signIn({
				...request.body,
				response
			})
		}).send(response);
	}
}

const instanceAuthController = new AuthController();
export { instanceAuthController };