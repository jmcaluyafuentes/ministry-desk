import express from "express";
import {
  getEntries,
  updateEntry,
  createEntry,
} from "../controllers/entryController";

const router = express.Router();

router.get("/", getEntries);
router.put('/:id', updateEntry);
router.post("/", createEntry);

export default router;
