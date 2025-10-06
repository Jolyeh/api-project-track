import { prisma } from "../config/prisma.js";

/**
 * Crée une organisation avec un propriétaire.
 * @param {Object} data - { name, ownerId }
 */
export async function createOrganization({ name, ownerId }) {
    // Vérifie que le propriétaire existe
    const owner = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!owner) throw new Error('Propriétaire introuvable');

    // Crée l'organisation
    const organization = await prisma.organization.create({
        data: {
            name,
            ownerId,
        },
    });

    return organization;
}

/**
 * Récupère une organisation par son ID (avec membres et projets).
 * @param {String} orgId 
 */
export async function getOrganizationById(orgId) {
    const organization = await prisma.organization.findUnique({
        where: { id: orgId },
        include: {
            owner: true,
            members: {
                include: { user: true, role: true },
            },
            projects: true,
        },
    });

    if (!organization) throw new Error('Organisation introuvable');

    return organization;
}

/**
 * Récupère toutes les organisations créées par un utilisateur (ownerId).
 * @param {String} ownerId 
 * @returns {Array} Liste des organisations
 */
export async function getOrganizationsByOwner(ownerId) {
    const organizations = await prisma.organization.findMany({
        where: { ownerId },
        include: {
            members: {
                include: { user: true, role: true }
            },
            projects: true,
            owner: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return organizations;
}

/**
 * Met à jour les infos d'une organisation.
 * @param {String} orgId 
 * @param {Object} data - { name }
 */
export async function updateOrganization(orgId, data) {
    // Par exemple ici on ne peut mettre à jour que le nom
    const organization = await prisma.organization.update({
        where: { id: orgId },
        data: {
            name: data.name,
        },
    });

    return organization;
}

/**
 * Supprime une organisation.
 * @param {String} orgId 
 */
export async function deleteOrganization(orgId) {
    await prisma.organization.delete({
        where: { id: orgId },
    });
    return true;
}

/**
 * Ajoute un membre à une organisation avec un rôle.
 * @param {String} orgId 
 * @param {String} userId 
 * @param {String} roleId 
 */
export async function addMemberToOrganization(orgId, userId, roleId) {
    // Vérifie que l'association n'existe pas déjà
    const existing = await prisma.member.findUnique({
        where: {
            unique_user_organization: {
                userId,
                organizationId: orgId,
            },
        },
    });
    if (existing) throw new Error("L'utilisateur est déjà membre de cette organisation");

    // Ajoute le membre
    const member = await prisma.member.create({
        data: {
            userId,
            organizationId: orgId,
            roleId,
        },
    });

    return member;
}

/**
 * Supprime un membre de l'organisation.
 * @param {String} orgId 
 * @param {String} userId 
 */
export async function removeMemberFromOrganization(orgId, userId) {
    const deleted = await prisma.member.deleteMany({
        where: {
            organizationId: orgId,
            userId,
        },
    });

    if (deleted.count === 0) throw new Error("Membre non trouvé dans l'organisation");

    return true;
}

/**
 * Liste tous les membres d'une organisation.
 * @param {String} orgId 
 */
export async function listMembers(orgId) {
    const members = await prisma.member.findMany({
        where: { organizationId: orgId },
        include: {
            user: true,
            role: true,
        },
    });

    return members;
}

// organisations d'un utilisateur
export async function getOrganizationsByUser(userId) {
  return prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      owner: true,
      members: {
        include: {
          user: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}