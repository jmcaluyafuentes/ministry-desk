import express from "express";
import { getEntries, createEntry } from "../controllers/entryController";

const router = express.Router();

router.get('/', getEntries);
router.post("/", createEntry);

export default router;
