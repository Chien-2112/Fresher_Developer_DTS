"use strict";

import express from "express";
import { instanceAuthController } from "../../controllers/auth.controller.js";
import { validateToken } from "../../middlewares/validateToken.js";
const router = express.Router();

router.post("/signup", instanceAuthController.signUp);
router.post("/signin", instanceAuthController.signIn);

router.use(validateToken);
router.post("/logout", instanceAuthController.logOut);
router.post("/refreshToken", instanceAuthController.refreshToken);

export { router as authRoute };