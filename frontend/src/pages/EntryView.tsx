import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import type { Entry } from '../types/entry';
import { Container, Typography, Button } from '@mui/material';

export default function EntryView() {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    axios.get(`/entries/${id}`).then(res => setEntry(res.data));
  }, [id]);

  if (!entry) return <p>Loading...</p>;

  return (
    <Container>
      <Typography variant="h4">{entry.title}</Typography>
      {entry.contentBlocks.map((block, i) => (
        block.type === 'paragraph' ? (
          <Typography key={i} paragraph>{block.value}</Typography>
        ) : (
          <img key={i} src={block.value} alt="Instruction visual" style={{ maxWidth: '100%' }} />
        )
      ))}
      <Button variant="contained" color="primary" component={Link} to={`/edit/${entry._id}`}>Edit</Button>
    </Container>
  );
}
