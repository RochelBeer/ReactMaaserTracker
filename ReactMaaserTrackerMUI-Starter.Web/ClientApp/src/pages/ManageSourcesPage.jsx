import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageSourcesPage = () => {

  const [sources, setSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState({ id: '', label: '' });
  const [editingSource, setEditingSource] = useState(false);

  const getsources = async () => {
    const { data } = await axios.get('/api/maaser/getsources')
    setSources(data)
  }

  useEffect(() => {
    getsources();
  }, [])

  const handleOpen = (source = { id: '', label: '' }) => {
    setOpen(true);
    setSelectedSource(source);
    setEditingSource(!source);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSource({ id: '', label: '' });
    setEditingSource(false);
  };

  const handleAddEdit = async () => {
    if (editingSource) {
      await axios.post('/api/maaser/editsource', { label: selectedSource.label, id: selectedSource.id })
    } else {
      await axios.post('/api/maaser/addsource', { label: selectedSource.label })
    }
    getsources();
    handleClose();
  };

  const handleDelete = async (sourceToDelete) => {
    await axios.post('/api/maaser/deletesource', sourceToDelete)
    getsources();
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
          Add Source
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map(source => (
              <TableRow key={source.id}>
                <TableCell sx={{ fontSize: '18px' }}>{source.label}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => { handleOpen(source) }} >Edit</Button>
                  <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => { handleDelete(source) }} >Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense"
            label="Source"
            name='label'
            type="text"
            fullWidth value={selectedSource.label}
            onChange={(e) => { setSelectedSource({ ...selectedSource, label: e.target.value }) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editingSource ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default ManageSourcesPage;

