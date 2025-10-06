// routes/status.routes.js
import express from 'express';
import {
  createStatusController,
  getStatusByIdController,
  updateStatusController,
  deleteStatusController,
  listStatusesController,
} from '../controllers/status.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const statusRoutes = express.Router();

//status
statusRoutes.post('/', authMiddleware, createStatusController);
statusRoutes.get('/', authMiddleware, listStatusesController);
statusRoutes.get('/:id', authMiddleware, getStatusByIdController);
statusRoutes.put('/:id', authMiddleware, updateStatusController);
statusRoutes.delete('/:id', authMiddleware, deleteStatusController);

export default statusRoutes;