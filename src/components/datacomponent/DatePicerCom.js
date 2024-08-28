import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';
const DatePicerCom = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formatted = dayjs(date).format('YYYY-MM-DD');
    setFormattedDate(formatted);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.mypayfone.com/marshal/admin/users/check_and_lock_user', {
        date:formattedDate,
        message: "locked"
      });

      if (response.status === 200) {
          toast.success('User checked and locked successfully:', response.data);
          // Handle success
      } else {
          toast.error('Error checking and locking user:', response);
          // Handle errors
      }
  } catch (error) {
      toast.error('Error during API call:', error);
      // Handle errors
  }
    // You can now use the formattedDate for submission
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, width: 350 }}>
      <Button type="submit" variant="contained" color="primary">
        LOCKED
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
