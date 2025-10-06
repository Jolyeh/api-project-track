import express from 'express';
import {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  getTasksByProjectController,
  getUserTasksByProjectController
} from '../controllers/task.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const taskRoutes = express.Router();

taskRoutes.post('/', authMiddleware, createTaskController);

taskRoutes.get('/:id', authMiddleware, getTaskController);

taskRoutes.put('/:id', authMiddleware, updateTaskController);

taskRoutes.delete('/:id', authMiddleware, deleteTaskController);

taskRoutes.get('/project/:projectId', authMiddleware, getTasksByProjectController);

taskRoutes.get('/project/:projectId/user', authMiddleware, getUserTasksByProjectController);

export default taskRoutes;