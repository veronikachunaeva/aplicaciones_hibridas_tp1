import express from "express";

const router = express.Router();
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController.js';    

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;