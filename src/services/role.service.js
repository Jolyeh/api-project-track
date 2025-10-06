// services/role.service.js
import { prisma } from "../config/prisma.js";

/**
 * Crée un nouveau rôle.
 * @param {Object} data - { name, scope, description }
 * @returns {Promise<Object>} Le rôle créé
 */
export async function createRole(data) {
  return prisma.role.create({
    data,
  });
}

/**
 * Récupère un rôle par son ID.
 * @param {string} id - ID du rôle
 * @returns {Promise<Object|null>} Le rôle ou null s'il n'existe pas
 */
export async function getRoleById(id) {
  return prisma.role.findUnique({
    where: { id },
  });
}

/**
 * Met à jour un rôle.
 * @param {string} id - ID du rôle à mettre à jour
 * @param {Object} data - Données à mettre à jour
 * @returns {Promise<Object>} Le rôle mis à jour
 */
export async function updateRole(id, data) {
  return prisma.role.update({
    where: { id },
    data,
  });
}

/**
 * Supprime un rôle.
 * @param {string} id - ID du rôle à supprimer
 * @returns {Promise<Object>} Le rôle supprimé
 */
export async function deleteRole(id) {
  return prisma.role.delete({
    where: { id },
  });
}

/**
 * Liste tous les rôles.
 * @returns {Promise<Array>} Liste des rôles
 */
export async function listRoles() {
  return prisma.role.findMany({
    orderBy: { createdAt: 'desc' },
  });
}