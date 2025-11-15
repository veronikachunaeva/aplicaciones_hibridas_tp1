import express from "express";
import { validateJWT} from '../middlewares/auth.js';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, authUser } from '../controllers/UserController.js';    


const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/auth', authUser);

export default router;