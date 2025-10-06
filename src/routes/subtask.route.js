import express from 'express';
import {
  createSubTaskController,
  getSubTaskController,
  updateSubTaskController,
  deleteSubTaskController,
  getSubTasksByTaskController,
} from '../controllers/subtask.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const subTaskRoutes = express.Router();

subTaskRoutes.post('/', authMiddleware, createSubTaskController);

subTaskRoutes.get('/:id', authMiddleware, getSubTaskController);

subTaskRoutes.put('/:id', authMiddleware, updateSubTaskController);

subTaskRoutes.delete('/:id', authMiddleware, deleteSubTaskController);

subTaskRoutes.get('/task/:taskId', authMiddleware, getSubTasksByTaskController);

export default subTaskRoutes;