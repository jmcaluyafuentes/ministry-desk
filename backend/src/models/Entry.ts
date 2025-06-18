import mongoose from 'mongoose';

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'image'],
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  contentBlocks: [contentBlockSchema]
}, { timestamps: true });

export default mongoose.model('Entry', entrySchema);
