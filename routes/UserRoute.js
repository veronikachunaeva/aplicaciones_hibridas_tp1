import express from "express";
import { validateJWT} from '../middlewares/auth.js';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, authUser } from '../controllers/UserController.js';    


const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', validateJWT, getUserById);
router.post('/', createUser);
router.put('/:id',validateJWT, updateUser);
router.delete('/:id', validateJWT, deleteUser);
router.post('/auth', authUser);

export default router;