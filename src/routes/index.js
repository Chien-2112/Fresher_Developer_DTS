"use strict";

import express from "express";
import { authRoute } from "./access/auth.js";

const router = express.Router();

router.use("/v1/api/", authRoute);

export { router as indexRoute };