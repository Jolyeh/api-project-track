import * as projectService from '../services/project.service.js';
import { sendResponse } from '../utils/response.js';

export async function createProjectController(req, res) {
  try {
    const { organizationId, name, description, deadline, statusId } = req.body;
    if (!organizationId || !name) {
      return sendResponse(res, false, 'organizationId et name sont obligatoires');
    }
    const project = await projectService.createProject({
      organizationId,
      name,
      description,
      deadline,
      statusId,
    });
    return sendResponse(res, true, 'Projet créé avec succès', project);
  } catch (error) {
    console.error('createProjectController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getProjectController(req, res) {
  try {
    const projectId = req.params.id;
    const project = await projectService.getProjectById(projectId);
    return sendResponse(res, true, 'Projet récupéré avec succès', project);
  } catch (error) {
    console.error('getProjectController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function updateProjectController(req, res) {
  try {
    const projectId = req.params.id;
    const data = req.body;
    const updatedProject = await projectService.updateProject(projectId, data);
    return sendResponse(res, true, 'Projet mis à jour avec succès', updatedProject);
  } catch (error) {
    console.error('updateProjectController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function deleteProjectController(req, res) {
  try {
    const projectId = req.params.id;
    await projectService.deleteProject(projectId);
    return sendResponse(res, true, 'Projet supprimé avec succès');
  } catch (error) {
    console.error('deleteProjectController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getProjectsByOrganizationController(req, res) {
  try {
    const organizationId = req.params.organizationId;
    const projects = await projectService.getProjectsByOrganization(organizationId);
    return sendResponse(res, true, 'Projets récupérés avec succès', projects);
  } catch (error) {
    console.error('getProjectsByOrganizationController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getProjectsByUserController(req, res) {
  try {
    const userId = req.user.id;
    const projects = await projectService.getProjectsByUser(userId);
    return sendResponse(res, true, 'Projets récupérés avec succès', projects);
  } catch (error) {
    console.error('getProjectsByUserController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

// Gestion des participants
export async function addParticipantController(req, res) {
  try {
    const projectId = req.params.id;
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      return sendResponse(res, false, 'userId et roleId sont obligatoires');
    }
    const participant = await projectService.addParticipant(projectId, userId, roleId);
    return sendResponse(res, true, 'Participant ajouté avec succès', participant);
  } catch (error) {
    console.error('addParticipantController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function removeParticipantController(req, res) {
  try {
    const projectId = req.params.id;
    const { userId } = req.body;
    if (!userId) {
      return sendResponse(res, false, 'userId est obligatoire');
    }
    await projectService.removeParticipant(projectId, userId);
    return sendResponse(res, true, 'Participant supprimé avec succès');
  } catch (error) {
    console.error('removeParticipantController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function listParticipantsController(req, res) {
  try {
    const projectId = req.params.id;
    const participants = await projectService.listParticipants(projectId);
    return sendResponse(res, true, 'Participants récupérés avec succès', participants);
  } catch (error) {
    console.error('listParticipantsController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}