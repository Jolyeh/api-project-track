// controllers/status.controller.js
import * as statusService from '../services/status.service.js';
import { sendResponse } from '../utils/response.js';

export async function createStatusController(req, res) {
  try {
    const { name, type, color } = req.body;
    if (!name || !type) {
      return sendResponse(res, false, "Les champs 'name' et 'type' sont obligatoires.");
    }

    const status = await statusService.createStatus({ name, type, color });
    return sendResponse(res, true, "Statut créé avec succès", status);
  } catch (error) {
    console.error("createStatusController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function getStatusByIdController(req, res) {
  try {
    const { id } = req.params;
    const status = await statusService.getStatusById(id);

    if (!status) {
      return sendResponse(res, false, "Statut non trouvé");
    }

    return sendResponse(res, true, "Statut récupéré avec succès", status);
  } catch (error) {
    console.error("getStatusByIdController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function updateStatusController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedStatus = await statusService.updateStatus(id, data);
    return sendResponse(res, true, "Statut mis à jour avec succès", updatedStatus);
  } catch (error) {
    console.error("updateStatusController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function deleteStatusController(req, res) {
  try {
    const { id } = req.params;
    await statusService.deleteStatus(id);
    return sendResponse(res, true, "Statut supprimé avec succès");
  } catch (error) {
    console.error("deleteStatusController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}

export async function listStatusesController(req, res) {
  try {
    const statuses = await statusService.listStatuses();
    return sendResponse(res, true, "Liste des statuts récupérée", statuses);
  } catch (error) {
    console.error("listStatusesController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}