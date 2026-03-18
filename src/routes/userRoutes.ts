import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser } from '../controllers/userController.js';
import { login } from '../auth/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);

router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserById);
router.post('/', authenticateToken, createUser);
router.put('/:id', authenticateToken, updateUser);

export default router;
