import { Request, Response } from 'express';
import Entry from '../models/Entry';

export const createEntry = async (req: Request, res: Response) => {
  const { title, contentBlocks } = req.body;
  const newEntry = new Entry({ title, contentBlocks });
  await newEntry.save();
  res.status(201).json(newEntry);
};
