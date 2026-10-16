import express from 'express';
import { authRoutes, coursesRoutes, notificationsRoutes } from '../common/index.js';
import { adminRoutes } from '../admin/index.js';
import { staffRoutes } from '../staff/index.js';
import studentRouter, { learningRoutes, applicationsRoutes, paymentsRoutes } from '../student/index.js';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Claxic Modular Admissions & Learning Engine',
    database: 'SQLite 3 WAL Engine (Unified Master)',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    modules: ['student', 'staff', 'admin', 'common'],
  });
});

// API Directory Index
router.get('/', (req, res) => {
  res.json({
    name: 'Claxic Modular API',
    version: '2.0.0',
    documentation: 'https://claxic.edu/docs',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      notifications: '/api/notifications',
      admin: '/api/admin',
      staff: '/api/staff',
      student: '/api/student',
      applications: '/api/applications',
      payments: '/api/payments',
      learning: '/api/learning',
    },
  });
});

// 1. Common / Shared Routes
router.use('/auth', authRoutes);
router.use('/courses', coursesRoutes);
router.use('/notifications', notificationsRoutes);

// 2. Admin Module Routes
router.use('/admin', adminRoutes);

// 3. Staff Module Routes
router.use('/staff', staffRoutes);

// 4. Student Module Routes
router.use('/student', studentRouter);
router.use('/applications', applicationsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/learning', learningRoutes);

// 5. Compatibility aliases for user applications, payments, courses, and projects
router.use('/user/applications', (req, res, next) => {
  req.url = '/user';
  applicationsRoutes(req, res, next);
});

router.use('/user/payments', (req, res, next) => {
  req.url = '/user';
  paymentsRoutes(req, res, next);
});

router.use('/user/courses', (req, res, next) => {
  req.url = '/my-courses';
  learningRoutes(req, res, next);
});

router.use('/user/projects', (req, res, next) => {
  req.url = '/projects';
  learningRoutes(req, res, next);
});

export default router;
