import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const AddIncomePage = () => {

    const [sources, setSource] = useState([]);
     const navigate = useNavigate();

    const [income, setIncome] = useState({ sourceId: '', amount: '', incomeDate: new Date() })
    useEffect(() => {
        const getSources = async () => {
            const { data } = await axios.get('/api/maaser/getsources')
            setSource(data);
        }
        getSources();
    }, [])

    const onAddIncomeClick = async () => {
        await axios.post('api/maaser/addincome', income)
        navigate("/income")
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.label}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
                onChange={(e, value) => { setIncome({ ...income, sourceId: value.id }) }}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                onChange={e => { setIncome({ ...income, amount: e.target.value }) }}
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(income.incomeDate).format('YYYY-MM-DD')}
                onChange={e => setIncome({...income, incomeDate: e.target.value})}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddIncomeClick}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;


