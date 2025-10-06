import { prisma } from "../config/prisma.js";

// Créer une sous-tâche
export async function createSubTask(data) {
  return prisma.subTask.create({ data });
}

// Récupérer une sous-tâche par ID
export async function getSubTaskById(id) {
  const subTask = await prisma.subTask.findUnique({
    where: { id },
    include: { status: true, task: true },
  });
  if (!subTask) throw new Error('Sous-tâche introuvable');
  return subTask;
}

// Mettre à jour une sous-tâche
export async function updateSubTask(id, data) {
  return prisma.subTask.update({
    where: { id },
    data,
  });
}

// Supprimer une sous-tâche
export async function deleteSubTask(id) {
  return prisma.subTask.delete({ where: { id } });
}

// Récupérer les sous-tâches d'une tâche
export async function getSubTasksByTask(taskId) {
  return prisma.subTask.findMany({
    where: { taskId },
    orderBy: { createdAt: 'desc' },
    include: { status: true },
  });
}