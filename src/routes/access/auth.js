"use strict";

import express from "express";
import { instanceAuthController } from "../../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", instanceAuthController.signUp);
router.post("/signin", instanceAuthController.signIn);

export { router as authRoute };