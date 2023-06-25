import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const OverviewPage = () => {

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalMaaser, setTotalMaaser] = useState(0);

  useEffect(() => {
    getTotalIncome();
    getTotalMaaser();
  }, [])

  const getTotalIncome = async () => {
    const { data } = await axios.get('/api/maaser/totalincome')
    setTotalIncome(data)
  }
  const getTotalMaaser = async () => {
    const { data } = await axios.get('/api/maaser/totalmaaser')
    setTotalMaaser(data)
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Total Income: ${totalIncome}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Total Maaser: ${totalMaaser}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Maaser Obligated: ${totalIncome * .1}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Remaining Maaser obligation: ${(totalIncome * .1) - totalMaaser}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
