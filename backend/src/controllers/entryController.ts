import { Request, Response } from 'express';
import Entry from '../models/Entry';

// Get all entries
export const getEntries = async (req: Request, res: Response) => {
  const entries = await Entry.find().sort({ createdAt: -1 });
  res.json(entries);
};

// Create a new entry
export const createEntry = async (req: Request, res: Response) => {
  const { title, contentBlocks } = req.body;
  const newEntry = new Entry({ title, contentBlocks });
  await newEntry.save();
  res.status(201).json(newEntry);
};

// Update an existing entry
export const updateEntry = async (req: Request, res: Response) => {
  const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(entry);
};

export const deleteEntry = async (req: Request, res: Response) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Entry deleted' });
};
