import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DatePicerCom = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formatted = dayjs(date).format('DD-MM-YYYY');
    setFormattedDate(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now use the formattedDate for submission
    console.log(`Selected Date: ${formattedDate}`);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, width: 350 }}>
      <Button type="submit" variant="contained" color="primary">
        UNLOCKED
        </Button>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          slotProps={{ textField: { size: 'small' } }}
        />
       
       
      </Box>
    </LocalizationProvider>
  )
}

export default DatePicerCom
