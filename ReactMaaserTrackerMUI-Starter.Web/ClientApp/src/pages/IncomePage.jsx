import React, { useEffect, useState } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';


const IncomePage = () => {


  const [groupBySource, setGroupBySource] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [sortedBySource, setSortedBySource] = useState([]);

  useEffect(() => {
    const getIncomes = async () => {
      const { data } = await axios.get('/api/maaser/getIncomes')
      setIncomes(data);
    }
    const getSortedIncomes = async () => {
      const { data } = await axios.get('/api/maaser/getsources')

      setSortedBySource(data);
    }
    getIncomes();
    getSortedIncomes();
  }, [])
//Sorted By Date
  //   const flatList = (list) => {
  //     const flattened = list.map(source => {
  //      return source.incomes.map(income => {
  //         return {
  //           source: source.label,
  //           amount: income.amount,
  //           incomeDate: income.incomeDate
  //         }
  //       })
  //     })
  //     const sorted = flattened.sort((a, b) => new Date(a.Date) - new Date(b.Date))
  //     console.log('sorted!', sorted)  
  //     return sorted  
  //   }
  //   const sortedList = flatList(sortedBySource);
  // console.log(sortedList)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {sortedBySource.map((s) => (
                s.incomes.sort((a, b) => new Date(a.date) - new Date(b.date)).map(income => (<TableRow key={income.id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {s.label}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.incomeDate).format('MM/DD/YYYY')}</TableCell>
                </TableRow>)
                )

              ))}

            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        sortedBySource.map((s) => (
          <div key={s.id} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {s.label}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {s.incomes.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {s.label}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.incomeDate).format('MM/DD/YYYY')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      )}
    </Container>
  );
}

export default IncomePage;
