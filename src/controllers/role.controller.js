// controllers/role.controller.js
import * as roleService from '../services/role.service.js';
import { sendResponse } from '../utils/response.js';

export async function createRoleController(req, res) {
  try {
    const { name, scope, description } = req.body;
    if (!name || !scope) {
      return sendResponse(res, false, "Les champs 'name' et 'scope' sont obligatoires.");
    }

    const role = await roleService.createRole({ name, scope, description });
    return sendResponse(res, true, "Rôle créé avec succès", role);
  } catch (error) {
    console.error("createRoleController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function getRoleByIdController(req, res) {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);

    if (!role) {
      return sendResponse(res, false, "Rôle non trouvé");
    }

    return sendResponse(res, true, "Rôle récupéré avec succès", role);
  } catch (error) {
    console.error("getRoleByIdController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function updateRoleController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedRole = await roleService.updateRole(id, data);
    return sendResponse(res, true, "Rôle mis à jour avec succès", updatedRole);
  } catch (error) {
    console.error("updateRoleController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function deleteRoleController(req, res) {
  try {
    const { id } = req.params;
    await roleService.deleteRole(id);
    return sendResponse(res, true, "Rôle supprimé avec succès");
  } catch (error) {
    console.error("deleteRoleController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function listRolesController(req, res) {
  try {
    const roles = await roleService.listRoles();
    return sendResponse(res, true, "Liste des rôles récupérée", roles);
  } catch (error) {
    console.error("listRolesController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}