"use strict";

import express from "express";
import { authRoute } from "./access/auth.js";
import { userRoute } from "./user/user.js";

const router = express.Router();

router.use("/v1/api/auth/", authRoute);
router.use("/v1/api/users/", userRoute);

export { router as indexRoute };