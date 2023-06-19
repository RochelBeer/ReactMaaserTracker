import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMaaserPage =() => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [maaser, setMaaser] = useState({id:'', recipient:'', amount:'', maaserDate:''});
    const navigate = useNavigate()

const onAddClick =async ()=>{
await axios.post('/api/maaser/addmaaser', {recipient: maaser.recipient, amount: maaser.amount, maaserDate: selectedDate})
navigate('/maaser')
}
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" value={maaser.recipient} onChange={e =>setMaaser({...maaser,recipient: e.target.value}) } />
                                                                                                    
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" value={maaser.amount} onChange={e =>setMaaser({...maaser,amount: e.target.value})} />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary"onClick={onAddClick}>Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
