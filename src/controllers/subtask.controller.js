import * as subTaskService from '../services/subtask.service.js';
import { sendResponse } from '../utils/response.js';

export async function createSubTaskController(req, res) {
  try {
    const { taskId, title, statusId } = req.body;
    if (!taskId || !title || !statusId) {
      return sendResponse(res, false, 'taskId, title et statusId sont obligatoires');
    }
    const subTask = await subTaskService.createSubTask({ taskId, title, statusId });
    return sendResponse(res, true, 'Sous-tâche créée avec succès', subTask);
  } catch (error) {
    console.error('createSubTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getSubTaskController(req, res) {
  try {
    const subTaskId = req.params.id;
    const subTask = await subTaskService.getSubTaskById(subTaskId);
    return sendResponse(res, true, 'Sous-tâche récupérée avec succès', subTask);
  } catch (error) {
    console.error('getSubTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function updateSubTaskController(req, res) {
  try {
    const subTaskId = req.params.id;
    const data = req.body;
    const updatedSubTask = await subTaskService.updateSubTask(subTaskId, data);
    return sendResponse(res, true, 'Sous-tâche mise à jour avec succès', updatedSubTask);
  } catch (error) {
    console.error('updateSubTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function deleteSubTaskController(req, res) {
  try {
    const subTaskId = req.params.id;
    await subTaskService.deleteSubTask(subTaskId);
    return sendResponse(res, true, 'Sous-tâche supprimée avec succès');
  } catch (error) {
    console.error('deleteSubTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}

export async function getSubTasksByTaskController(req, res) {
  try {
    const taskId = req.params.taskId;
    const subTasks = await subTaskService.getSubTasksByTask(taskId);
    return sendResponse(res, true, 'Sous-tâches récupérées avec succès', subTasks);
  } catch (error) {
    console.error('getSubTasksByTaskController error:', error);
    return sendResponse(res, false, error.message || 'Erreur interne du serveur');
  }
}