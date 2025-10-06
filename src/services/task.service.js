import { prisma } from "../config/prisma.js";

// Créer une tâche
export async function createTask(data) {
  return prisma.task.create({ data });
}

// Récupérer une tâche par ID
export async function getTaskById(id) {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      project: true,
      status: true,
      assignee: true,
      subTasks: true,
    },
  });
  if (!task) throw new Error('Tâche introuvable');
  return task;
}

// Mettre à jour une tâche
export async function updateTask(id, data) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

// Supprimer une tâche
export async function deleteTask(id) {
  return prisma.task.delete({ where: { id } });
}

// Récupérer les tâches d'un projet
export async function getTasksByProject(projectId) {
  return prisma.task.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' },
    include: {
      status: true,
      assignee: true,
      subTasks: true,
    },
  });
}

// Assigner une tâche à un utilisateur
export async function assignTask(taskId, userId) {
  return prisma.task.update({
    where: { id: taskId },
    data: { assignedTo: userId },
  });
}

//tache d'un utilisateur
export async function getUserTasksByProject(userId, projectId) {
  // Vérifier que l'utilisateur est participant du projet
  const participant = await prisma.participant.findUnique({
    where: {
      unique_user_project: {
        userId,
        projectId,
      }
    }
  });

  if (!participant) {
    throw new Error("Vous n'êtes pas participant de ce projet");
  }

  // Récupérer les tâches liées au projet
  return prisma.task.findMany({
    where: { projectId },
    include: {
      status: true,
      assignee: true,
      subTasks: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}