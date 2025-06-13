"use strict";
import { AuthService } from "../services/access/auth.service.js";
import { 
	CREATED, 
	OK 
} from "../core/success.response.js";

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
		const { accessToken, refreshToken } = await AuthService.signIn(request.body);

		response.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 72 * 60 * 60 * 1000,
			secure: true,
			path: "/",
			sameSite: "strict"
		});

		new OK({
			message: "Login successfully",
			metadata: { accessToken }
		}).send(response);
	}

	// LOGOUT.
	logOut = async(request, response, next) => {
		console.log(`[P]::logOut::`);
		const metadata = await AuthService.logOut({ userId: request.user.userId })

		response.clearCookie("refreshToken", {
			httpOnly: true,
			secure: true,
			path: '/',
			sameSite: "strict",
		});

		new OK({
			message: "Logout successfully!",
			metadata: metadata
		}).send(response);
	}

	// REFRESH TOKEN.
	refreshToken = async(request, response, next) => {
		console.log(`[P]::refreshToken::`);

		const data = await AuthService.handleRefreshToken({
			keyToken: request.keyToken,
			user: request.user,
			refreshToken: request.refreshToken
		});

		response.cookie("refreshToken", data.newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/",
			maxAge: 72 * 60 * 60 * 1000,
		});

		new OK({
			message: "Refresh token successfully!",
			metadata: {
				newAccessToken: data.newAccessToken
			}
		}).send(response);
	}
}

const instanceAuthController = new AuthController();
export { instanceAuthController };