"use strict";

class AuthController {
	// SIGNUP.
	signUp = async(request, response, next) => {
		console.log(`[P]::signIp::`, request.body);
		new CREATED({
			message: "Registered Successfully!",
			metadata: await Aut
		})
	}
}