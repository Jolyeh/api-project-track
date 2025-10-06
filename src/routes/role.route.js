// routes/role.routes.js
import express from 'express';
import {
  createRoleController,
  getRoleByIdController,
  updateRoleController,
  deleteRoleController,
  listRolesController,
} from '../controllers/role.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const roleRoutes = express.Router();

// rôle
roleRoutes.post('/', authMiddleware, createRoleController);
roleRoutes.get('/', authMiddleware, listRolesController);
roleRoutes.get('/:id', authMiddleware, getRoleByIdController);
roleRoutes.put('/:id', authMiddleware, updateRoleController);
roleRoutes.delete('/:id', authMiddleware, deleteRoleController);

export default roleRoutes;