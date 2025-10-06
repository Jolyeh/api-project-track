import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js';
import organizationRoutes from './routes/organization.route.js';
import roleRoutes from './routes/role.route.js';
import statusRoutes from './routes/status.route.js';
import projectRoutes from './routes/project.route.js';
import taskRoutes from './routes/task.route.js';
import subTaskRoutes from './routes/subtask.route.js';

const app = express();
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api', authRoutes);
app.use('/api/organisation', organizationRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/projet', projectRoutes);
app.use('/api/tache', taskRoutes);
app.use('/api/sous-tache', subTaskRoutes);
  
export default app;