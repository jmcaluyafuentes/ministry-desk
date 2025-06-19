import express from "express";
import {
  getEntries,
  getEntry,
  updateEntry,
  createEntry,
  deleteEntry,
} from "../controllers/entryController";
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get("/", getEntries);
router.get("/:id", getEntry);
router.put("/:id", verifyToken, updateEntry);
router.post("/", verifyToken, createEntry);
router.delete("/:id", verifyToken, deleteEntry);

export default router;
