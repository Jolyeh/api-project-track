import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

// Routes d'authentification
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/profile", authMiddleware, getProfile);

export default authRoutes;