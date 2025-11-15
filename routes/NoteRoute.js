import express from 'express';
import { validateJWT} from '../middlewares/auth.js';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  filterByStatus
} from '../controllers/NoteController.js';

const router = express.Router();

router.post('/', validateJWT, createNote);
router.get('/', validateJWT, getAllNotes);
router.get('/filter-status', validateJWT, filterByStatus);
router.get('/:id', validateJWT, getNoteById);
router.put('/:id', validateJWT, updateNote);
router.delete('/:id', validateJWT, deleteNote);

export default router;