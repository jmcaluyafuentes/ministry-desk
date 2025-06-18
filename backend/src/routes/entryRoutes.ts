import express from "express";
import {
  getEntries,
  getEntry,
  updateEntry,
  createEntry,
  deleteEntry,
} from "../controllers/entryController";

const router = express.Router();

router.get("/", getEntries);
router.get("/:id", getEntry);
router.put("/:id", updateEntry);
router.post("/", createEntry);
router.delete("/:id", deleteEntry);

export default router;
