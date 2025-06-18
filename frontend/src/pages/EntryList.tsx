import { useEffect, useState } from 'react';
import axios from '../api/axios';
import type { Entry } from '../types/entry';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, Button } from '@mui/material';

export default function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    axios.get('/entries').then((res) => setEntries(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Troubleshooting Guide</Typography>
      <Button variant="contained" component={Link} to="/create">Create New Entry</Button>
      <List>
        {entries.map(entry => (
          <ListItem key={entry._id} component={Link} to={`/entry/${entry._id}`}>
            {entry.title}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
