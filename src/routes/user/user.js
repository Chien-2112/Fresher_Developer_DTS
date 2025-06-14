"use strict";

import express from "express";
import { instanceUserController } from "../../controllers/user.controller.js";
import { 
	validateToken, 
	authorizedSelfOrAdmin,
	authorizedAdmin,
} from "../../middlewares/validateToken.js";

const router = express.Router();

router.use(validateToken);

router.get("/", authorizedAdmin, instanceUserController.getAllUsers);
router.get("/:id", authorizedSelfOrAdmin, instanceUserController.getUser);
router.put("/:id", instanceUserController.updateUserById);
router.delete("/:id", authorizedSelfOrAdmin, instanceUserController.deleteUserById);

export { router as userRoute };