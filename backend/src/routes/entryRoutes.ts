import express from "express";
import {
  getEntries,
  updateEntry,
  createEntry,
  deleteEntry,
} from "../controllers/entryController";

const router = express.Router();

router.get("/", getEntries);
router.put("/:id", updateEntry);
router.post("/", createEntry);
router.delete("/:id", deleteEntry);

export default router;
