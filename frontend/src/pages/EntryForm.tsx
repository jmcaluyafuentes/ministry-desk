import { useState } from 'react';
import type { ContentBlock } from '../types/entry';
import { Container, Typography, TextField, Button, Box, MenuItem } from '@mui/material';

const defaultBlock: ContentBlock = { type: 'paragraph', value: '' };

export default function EntryForm() {
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([defaultBlock]);

  const handleBlockChange = (index: number, key: 'type' | 'value', value: string) => {
  const updated = [...contentBlocks];
  updated[index][key] = value as any;
  setContentBlocks(updated);
};

const addBlock = () => {
  setContentBlocks([...contentBlocks, { ...defaultBlock }]);
};

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Entry</Typography>

      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button variant="contained" disabled={!title}>
        Create Entry
      </Button>

      {contentBlocks.map((block, index) => (
        <Box key={index} display="flex" gap={2} mb={2}>
          <TextField
            select
            label="Type"
            value={block.type}
            onChange={(e) => handleBlockChange(index, 'type', e.target.value)}
          >
            <MenuItem value="paragraph">Paragraph</MenuItem>
            <MenuItem value="image">Image</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label={block.type === 'paragraph' ? 'Text' : 'Image URL'}
            value={block.value}
            onChange={(e) => handleBlockChange(index, 'value', e.target.value)}
          />
        </Box>
      ))}

<Button onClick={addBlock} variant="outlined">Add Block</Button>
    </Container>
  );
}
