import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import entryRoutes from './routes/entryRoutes';
import auth from './routes/auth';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/entries', entryRoutes);
app.use('/api/auth', auth);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch ((err) => console.log(err));
