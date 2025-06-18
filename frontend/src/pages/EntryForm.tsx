import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Entry, ContentBlock } from '../types/entry';
import axios from '../api/axios';

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  MenuItem
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

const defaultBlock: ContentBlock = { type: 'paragraph', value: '' };

export default function EntryForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // If editing

  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([defaultBlock]);

  // If editing, fetch the entry
  useEffect(() => {
    if (id) {
      axios.get(`/entries/${id}`).then(res => {
        const entry = res.data as Entry;
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
    const payload: Entry = { title, contentBlocks };
    if (id) {
      await axios.put(`/entries/${id}`, payload);
    } else {
      await axios.post('/entries', payload);
    }
    navigate(`/entry/${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{id ? 'Edit' : 'Create'} Entry</Typography>

      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {contentBlocks.map((block, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2} gap={2}>
          <TextField
            select
            label="Type"
            value={block.type}
            onChange={(e) => handleBlockChange(index, 'type', e.target.value)}
            sx={{ minWidth: 120 }}
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

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title || contentBlocks.length === 0}
        >
          {id ? 'Update' : 'Create'} Entry
        </Button>
      </Box>
    </Container>
  );
}
