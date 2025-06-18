import express from "express";
import { createEntry } from "../controllers/entryController";

const router = express.Router();

router.post("/", createEntry);

export default router;
