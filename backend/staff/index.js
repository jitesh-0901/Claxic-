import express from 'express';
import staffRoutes, { isStaffAllotted } from './staff.routes.js';

const router = express.Router();
router.use('/', staffRoutes);

export { isStaffAllotted, staffRoutes };
export default router;
