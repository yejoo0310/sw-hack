import express from "express";

import UserController from "../controllers/user.js";

import asyncWrapper from "../middleware/asyncWrapper.js";

const router = express.Router();

router.post("/login", asyncWrapper(UserController.login));

export default router;
