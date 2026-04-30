import express, { Router } from "express";
import validateBody from "#middleware/zod-validate";
import { loginSchema, registerSchema } from "#schemas/authSchema";
import { authMiddleware } from "#middleware/auth";
import {
    getCurrentUser,
    loggedInUser,
    registeredUser,
    logoutUser
} from "#controllers/authController";

const router =express.Router();

// enpoint for register user 
router.post("/register",validateBody(registerSchema),registeredUser);
router.post("/login",validateBody(loginSchema), loggedInUser);

router.get("/me", authMiddleware, getCurrentUser);

router.post("/logout",authMiddleware, logoutUser);

export default router;