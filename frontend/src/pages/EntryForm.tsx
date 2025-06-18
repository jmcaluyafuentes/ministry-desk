import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import type { ContentBlock } from '../types/entry';
import { Container, Typography, TextField, Button, Box, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultBlock: ContentBlock = { type: 'paragraph', value: '' };

export default function EntryForm() {
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([defaultBlock]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/entries/${id}`).then(res => {
        const entry = res.data;
        setTitle(entry.title);
        setContentBlocks(entry.contentBlocks);
      });
    }
  }, [id]);

  const handleBlockChange = (index: number, key: 'type' | 'value', value: string) => {
  const updated = [...contentBlocks];
  updated[index][key] = value as any;
  setContentBlocks(updated);
  };

  const addBlock = () => {
    setContentBlocks([...contentBlocks, { ...defaultBlock }]);
  };

  const removeBlock = (index: number) => {
    const updated = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updated);
  };

  const handleSubmit = async () => {
    const payload = { title, contentBlocks };
    if (id) {
      await axios.put(`/entries/${id}`, payload);
    } else {
      const res = await axios.post('/entries', payload);
      navigate(`/entry/${res.data._id}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>{id ? 'Edit' : 'Create'} Entry</Typography>

      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button variant="contained" onSubmit={handleSubmit} disabled={!title}>
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

        <IconButton onClick={() => removeBlock(index)} color="error">
          <DeleteIcon />
        </IconButton>

        </Box>
      ))}

<Button onClick={addBlock} variant="outlined">Add Block</Button>
    </Container>
  );
}
