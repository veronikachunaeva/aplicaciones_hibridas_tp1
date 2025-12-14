import express from "express";
import { validateJWT} from '../middlewares/auth.js';
import { createLink, getAllLinks, getLinkById, updateLink, deleteLink, filterByLink, filterByGroup, getLinksByCategory, } from "../controllers/LinkController.js";

const router = express.Router();

router.get('/', validateJWT, getAllLinks);
router.get('/link-filter', validateJWT, filterByLink);
router.get('/group-filter', validateJWT, filterByGroup);
router.get('/:id', validateJWT, getLinkById);
router.post('/', validateJWT, createLink);
router.put('/:id', validateJWT, updateLink);
router.delete('/:id', validateJWT, deleteLink);
router.get('/category/:categoryId', validateJWT, getLinksByCategory);

export default router;