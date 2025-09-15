import express from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  filterByStatus
} from '../controllers/NoteController.js';

const router = express.Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/filter-status', filterByStatus);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;