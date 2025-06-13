"use strict";

import { KEYTOKEN } from "../../models/keyToken.model.js";
import { BadRequestError } from "../../core/error.response.js";
import { Types } from "mongoose";

class KeyTokenService {
	static createKeyToken = async({
		userId, privateKey, publicKey, refreshToken
	}) => {
		try {
			const filter = { user_id: userId };
			const update = {
				privateKey: privateKey,
				publicKey: publicKey,
				refreshTokenUsed: [],
				refreshToken: refreshToken
			}
			const options = { new: true, upsert: true };
			const tokens = await KEYTOKEN.findOneAndUpdate(filter, update, options);

			return tokens ? tokens.publicKey : null;
		}
		catch(error) {
			throw new BadRequestError("Error creating key token!");
		}
	}

	static removeKeyById = async(id) => {
		if(!Types.ObjectId.isValid(id)) {
			throw new BadRequestError("Invalid ID Format");
		}
		return await KEYTOKEN.deleteOne({ user_id: id });
	}

	static deleteKeyById = async(userId) => {
		return await KEYTOKEN.deleteOne({ user_id: userId });
	}

	static updateRefreshToken = async(userId, refreshToken, newRefreshToken) => {
		return await KEYTOKEN.updateOne(
			{ user_id: userId },
			{
				$set: { refreshToken: newRefreshToken },
				$addToSet: { refreshTokenUsed: refreshToken }
			}
		);
	}
}

export { KeyTokenService };