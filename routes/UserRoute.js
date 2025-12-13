import express from "express";
import { validateJWT} from '../middlewares/auth.js';
import { isAdmin } from "../middlewares/isAdmin.js";
import { createUser,getUserProfile, getAllUsers, getUserById, updateUserProfile, updateUserRole, deleteUser, authUser } from '../controllers/UserController.js';    

const router = express.Router();
router.post('/', createUser);
router.post('/auth', authUser);
router.post('/profile', validateJWT, getUserProfile);
router.put('/profile/edit', validateJWT, updateUserProfile);

router.get('/', validateJWT, isAdmin, getAllUsers);
router.get('/:id', validateJWT, isAdmin, getUserById);
router.put('/:id/edit', validateJWT, isAdmin, updateUserRole);
router.delete('/:id', validateJWT, isAdmin, deleteUser);

export default router;