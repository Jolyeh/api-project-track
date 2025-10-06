import * as taskService from '../services/task.service.js';
import { sendResponse } from '../utils/response.js';

export async function createTaskController(req, res) {
  try {
    const { projectId, title, description, statusId, assignedTo, dueDate } = req.body;
    if (!projectId || !title || !statusId) {
      return sendResponse(res, false, 'projectId, title et statusId sont obligatoires');
    }
    const task = await taskService.createTask({
      projectId,
      title,
      description,
      statusId,
      assignedTo,
      dueDate,
    });
    return sendResponse(res, true, 'Tâche créée avec succès', task);
  } catch (error) {
    console.error('createTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getTaskController(req, res) {
  try {
    const taskId = req.params.id;
    const task = await taskService.getTaskById(taskId);
    return sendResponse(res, true, 'Tâche récupérée avec succès', task);
  } catch (error) {
    console.error('getTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function updateTaskController(req, res) {
  try {
    const taskId = req.params.id;
    const data = req.body;
    const updatedTask = await taskService.updateTask(taskId, data);
    return sendResponse(res, true, 'Tâche mise à jour avec succès', updatedTask);
  } catch (error) {
    console.error('updateTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function deleteTaskController(req, res) {
  try {
    const taskId = req.params.id;
    await taskService.deleteTask(taskId);
    return sendResponse(res, true, 'Tâche supprimée avec succès');
  } catch (error) {
    console.error('deleteTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getTasksByProjectController(req, res) {
  try {
    const projectId = req.params.projectId;
    const tasks = await taskService.getTasksByProject(projectId);
    return sendResponse(res, true, 'Tâches récupérées avec succès', tasks);
  } catch (error) {
    console.error('getTasksByProjectController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getUserTasksByProjectController(req, res) {
  try {
    const userId = req.user.id;  // Récupéré via authMiddleware
    const projectId = req.params.projectId;

    const tasks = await taskService.getUserTasksByProject(userId, projectId);
    return sendResponse(res, true, "Tâches récupérées avec succès", tasks);
  } catch (error) {
    console.error("getUserTasksByProjectController error:", error);
    return sendResponse(res, false, error.message || "Erreur interne du serveur");
  }
}