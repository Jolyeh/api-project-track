// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.js";
import { prisma } from "../config/prisma.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return sendResponse(res, false, "Cet email est déjà utilisé");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    return sendResponse(res, true, "Utilisateur créé avec succès", user);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, "Erreur interne du serveur");
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return sendResponse(res, false, "Email ou mot de passe incorrect");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, false, "Email ou mot de passe incorrect");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return sendResponse(res, true, "Connexion réussie", { token, user });
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, "Erreur interne du serveur");
  }
}

export async function getProfile(req, res) {
  try {
    // selon ton middleware JWT, le payload peut être { id: ... } ou { userId: ... }
    const userId = req.user?.id ?? req.user?.userId;
    if (!userId) {
      return sendResponse(res, false, "Accès non autorisé");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return sendResponse(res, false, "Utilisateur introuvable");
    }

    return sendResponse(res, true, "Profil récupéré avec succès", user);
  } catch (error) {
    console.error("getProfile error:", error);
    return sendResponse(res, false, "Erreur interne du serveur");
  }
}
