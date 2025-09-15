import express from "express";

const router = express.Router();
import { createLink, getAllLinks, getLinkById, updateLink, deleteLink, filterByLink, filterByGroup } from "../controllers/LinkController.js";

router.get('/', getAllLinks);
router.get('/link-filter', filterByLink);
router.get('/group-filter', filterByGroup);
router.get('/:id', getLinkById);
router.post('/', createLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);

export default router;