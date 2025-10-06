import express from 'express';
import {
  createProjectController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
  getProjectsByOrganizationController,
  getProjectsByUserController,
  addParticipantController,
  removeParticipantController,
  listParticipantsController,
} from '../controllers/project.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const projectRoutes = express.Router();

projectRoutes.post('/', authMiddleware, createProjectController);

projectRoutes.get('/:id', authMiddleware, getProjectController);

projectRoutes.put('/:id', authMiddleware, updateProjectController);

projectRoutes.delete('/:id', authMiddleware, deleteProjectController);

// Projets par organisation
projectRoutes.get('/organization/:organizationId', authMiddleware, getProjectsByOrganizationController);

// Projets où l'utilisateur est participant
projectRoutes.get('/user/participating', authMiddleware, getProjectsByUserController);

// Participants
projectRoutes.post('/:id/participants', authMiddleware, addParticipantController);
projectRoutes.delete('/:id/participants', authMiddleware, removeParticipantController);
projectRoutes.get('/:id/participants', authMiddleware, listParticipantsController);

export default projectRoutes;