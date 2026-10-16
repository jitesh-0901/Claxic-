import express from 'express';
import learningRoutes from './learning.routes.js';
import applicationsRoutes from './applications.routes.js';
import paymentsRoutes from './payments.routes.js';

const router = express.Router();

router.use('/learning', learningRoutes);
router.use('/applications', applicationsRoutes);
router.use('/payments', paymentsRoutes);

export { learningRoutes, applicationsRoutes, paymentsRoutes };
export default router;
