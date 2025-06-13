"use strict";

import express from "express";
import { instanceUserController } from "../../controllers/user.controller.js";
import { 
	validateToken, 
	authorizedAdmin 
} from "../../middlewares/validateToken.js";

const router = express.Router();

router.use(validateToken);

router.get("/", instanceUserController.getAllUsers);
router.get("/:id", instanceUserController.getUser);
router.put("/:id", instanceUserController.updateUserById);
router.delete("/:id", authorizedAdmin, instanceUserController.deleteUserById);

export { router as userRoute };