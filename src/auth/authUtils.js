"use strict";
import jwt from "jsonwebtoken";

const generateAccessToken = ({ payload, privateKey }) => {
	return jwt.sign(payload, privateKey, {
		algorithm: "RS256",
		expiresIn: "30s"
	});
}

const generateRefreshToken = ({ payload, privateKey }) => {
	return jwt.sign(payload, privateKey, {
		algorithm: "RS256",
		expiresIn: "7 days"
	});
}


export {
	generateAccessToken,
	generateRefreshToken,
};