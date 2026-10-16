import express from 'express';
import authRoutes from './auth.routes.js';
import coursesRoutes, { enrichCourseWithRealStaff } from './courses.routes.js';
import notificationsRoutes from './notifications.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/courses', coursesRoutes);
router.use('/notifications', notificationsRoutes);

export { authRoutes, coursesRoutes, notificationsRoutes, enrichCourseWithRealStaff };
export default router;
