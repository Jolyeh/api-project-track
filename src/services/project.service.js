import { prisma } from "../config/prisma.js";

// Créer un projet
export async function createProject(data) {
    return prisma.project.create({ data });
}

// Récupérer un projet par ID
export async function getProjectById(id) {
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            organization: true,
            participants: {
                include: {
                    user: true,
                    role: true,
                },
            },
            tasks: true,
        },
    });
    if (!project) throw new Error('Projet introuvable');
    return project;
}

// Mettre à jour un projet
export async function updateProject(id, data) {
    return prisma.project.update({
        where: { id },
        data,
    });
}

// Supprimer un projet
export async function deleteProject(id) {
    return prisma.project.delete({ where: { id } });
}

// Récupérer les projets d'une organisation
export async function getProjectsByOrganization(organizationId) {
    return prisma.project.findMany({
        where: { organizationId },
        orderBy: { createdAt: 'desc' },
    });
}

// Récupérer les projets dont l'utilisateur est participant
export async function getProjectsByUser(userId) {
    return prisma.project.findMany({
        where: {
            participants: {
                some: { userId },
            },
        },
        include: {
            organization: true,
            participants: true,
            tasks: true,
        },
    });
}

// Ajouter un participant à un projet
export async function addParticipant(projectId, userId, roleId) {
    // vérifier si déjà participant ?
    const exists = await prisma.participant.findUnique({
        where: {
            unique_user_project: { userId, projectId },
        },
    });
    if (exists) throw new Error('Utilisateur déjà participant');

    return prisma.participant.create({
        data: {
            projectId,
            userId,
            roleId,
            joinedAt: new Date(),
        },
    });
}

// Retirer un participant d'un projet
export async function removeParticipant(projectId, userId) {
    return prisma.participant.delete({
        where: {
            userId_projectId: { userId, projectId },
        },
    });
}

// Lister les participants d'un projet
export async function listParticipants(projectId) {
    return prisma.participant.findMany({
        where: { projectId },
        include: {
            user: true,
            role: true,
        },
    });
}