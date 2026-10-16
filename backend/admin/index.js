import express from 'express';
import adminRoutes from './admin.routes.js';

const router = express.Router();
router.use('/', adminRoutes);

export { adminRoutes };
export default router;
