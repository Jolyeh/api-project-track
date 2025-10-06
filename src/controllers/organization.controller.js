
import * as orgService from '../services/organization.service.js';
import { sendResponse } from '../utils/response.js';

export async function createOrganizationController(req, res) {
    try {
        const ownerId = req.user.id; // ID du propriétaire récupéré du token JWT
        const { name } = req.body;

        if (!name) {
            return sendResponse(res, false, "Le nom de l'organisation est obligatoire");
        }

        const organization = await orgService.createOrganization({ name, ownerId });
        return sendResponse(res, true, "Organisation créée avec succès", organization);
    } catch (error) {
        console.error("createOrganizationController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function getOrganizationController(req, res) {
    try {
        const orgId = req.params.id;
        const organization = await orgService.getOrganizationById(orgId);
        return sendResponse(res, true, "Organisation récupérée avec succès", organization);
    } catch (error) {
        console.error("getOrganizationController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function updateOrganizationController(req, res) {
    try {
        const orgId = req.params.id;
        const { name } = req.body;

        if (!name) {
            return sendResponse(res, false, "Le nom est obligatoire pour la mise à jour");
        }

        const organization = await orgService.updateOrganization(orgId, { name });
        return sendResponse(res, true, "Organisation mise à jour avec succès", organization);
    } catch (error) {
        console.error("updateOrganizationController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function deleteOrganizationController(req, res) {
    try {
        const orgId = req.params.id;
        await orgService.deleteOrganization(orgId);
        return sendResponse(res, true, "Organisation supprimée avec succès");
    } catch (error) {
        console.error("deleteOrganizationController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function addMemberController(req, res) {
    try {
        const orgId = req.params.id;
        const { userId, roleId } = req.body;

        if (!userId || !roleId) {
            return sendResponse(res, false, "userId et roleId sont obligatoires");
        }

        const member = await orgService.addMemberToOrganization(orgId, userId, roleId);
        return sendResponse(res, true, "Membre ajouté avec succès", member);
    } catch (error) {
        console.error("addMemberController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function removeMemberController(req, res) {
    try {
        const orgId = req.params.id;
        const { userId } = req.body;

        if (!userId) {
            return sendResponse(res, false, "userId est obligatoire");
        }

        await orgService.removeMemberFromOrganization(orgId, userId);
        return sendResponse(res, true, "Membre supprimé avec succès");
    } catch (error) {
        console.error("removeMemberController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function listMembersController(req, res) {
    try {
        const orgId = req.params.id;
        const members = await orgService.listMembers(orgId);
        return sendResponse(res, true, "Membres récupérés avec succès", members);
    } catch (error) {
        console.error("listMembersController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function listMyOrganizationsController(req, res) {
    try {
        const ownerId = req.user.id;
        const organizations = await orgService.getOrganizationsByOwner(ownerId);
        return sendResponse(res, true, "Organisations récupérées avec succès", organizations);
    } catch (error) {
        console.error("listMyOrganizationsController error:", error);
        return sendResponse(res, false, error.message || "Erreur interne du serveur");
    }
}

export async function getUserOrganizationsController(req, res) {
  try {
    const userId = req.user.id; // supposé injecté par authMiddleware
    const organizations = await orgService.getOrganizationsByUser(userId);
    return sendResponse(res, true, "Organisations récupérées avec succès", organizations);
  } catch (error) {
    console.error("getUserOrganizationsController error:", error);
    return sendResponse(res, false, "Erreur interne du serveur");
  }
}