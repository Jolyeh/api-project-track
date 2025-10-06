// services/status.service.js
import { prisma } from "../config/prisma.js";

/**
 * Crée un status.
 * @param {Object} data - { name, type, color }
 */
export async function createStatus(data) {
  return prisma.status.create({
    data,
  });
}

/**
 * Récupère un status par ID.
 */
export async function getStatusById(id) {
  return prisma.status.findUnique({
    where: { id },
  });
}

/**
 * Met à jour un status.
 */
export async function updateStatus(id, data) {
  return prisma.status.update({
    where: { id },
    data,
  });
}

/**
 * Supprime un status.
 */
export async function deleteStatus(id) {
  return prisma.status.delete({
    where: { id },
  });
}

/**
 * Liste tous les status.
 */
export async function listStatuses() {
  return prisma.status.findMany({
    orderBy: { createdAt: 'desc' },
  });
}