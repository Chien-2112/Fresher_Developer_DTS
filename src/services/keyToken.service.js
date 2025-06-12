"use strict";

import { KEYTOKEN } from "../models/keyToken.model.js";
import { BadRequestError } from "../core/error.response.js";

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
}

export { KeyTokenService };