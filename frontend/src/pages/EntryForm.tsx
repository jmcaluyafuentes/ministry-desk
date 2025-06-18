import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

export default function EntryForm() {
  const [title, setTitle] = useState('');

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
    </Container>
  );
}
