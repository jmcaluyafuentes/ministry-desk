import { Request, Response } from 'express';
import Entry from '../models/Entry';

export const getEntries = async (req: Request, res: Response) => {
  const entries = await Entry.find().sort({ createdAt: -1 });
  res.json(entries);
};

export const createEntry = async (req: Request, res: Response) => {
  const { title, contentBlocks } = req.body;
  const newEntry = new Entry({ title, contentBlocks });
  await newEntry.save();
  res.status(201).json(newEntry);
};

