import express from 'express';
import {
    createOrganizationController,
    getOrganizationController,
    updateOrganizationController,
    deleteOrganizationController,
    addMemberController,
    removeMemberController,
    listMembersController,
    listMyOrganizationsController,
    getUserOrganizationsController,
} from '../controllers/organization.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const organizationRoutes = express.Router();

// Création d'une organisation
organizationRoutes.post('/', authMiddleware, createOrganizationController);
organizationRoutes.get('/mine', authMiddleware, listMyOrganizationsController);
organizationRoutes.get('/member-of', authMiddleware, getUserOrganizationsController);
organizationRoutes.get('/:id', authMiddleware, getOrganizationController);
organizationRoutes.put('/:id', authMiddleware, updateOrganizationController);
organizationRoutes.delete('/:id', authMiddleware, deleteOrganizationController);

organizationRoutes.post('/:id/members', authMiddleware, addMemberController);
organizationRoutes.delete('/:id/members', authMiddleware, removeMemberController);
organizationRoutes.get('/:id/members', authMiddleware, listMembersController);

export default organizationRoutes;