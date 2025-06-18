import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import type { Entry } from '../types/entry';
import { Container, Typography, Button } from '@mui/material';

export default function EntryView() {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/entries/${id}`).then(res => setEntry(res.data));
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/entries/${id}`);
    navigate('/');
  };

  if (!entry) return <p>Loading...</p>;

  return (
    <Container sx={{ width: '70%'}}>
      <Typography variant="h4" sx={{ mt: 4, mb: 2}}>{entry.title}</Typography>
      {entry.contentBlocks.map((block, i) => (
        block.type === 'paragraph' ? (
          <Typography key={i} paragraph>{block.value}</Typography>
        ) : (
          <img key={i} src={block.value} alt="Instruction visual" style={{ width: '600px', objectFit: 'cover', maxWidth: '100%' }} />
        )
      ))}
      <Button variant="contained" color="primary" component={Link} to={`/edit/${entry._id}`}>Edit</Button>
      <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
    </Container>
  );
}
