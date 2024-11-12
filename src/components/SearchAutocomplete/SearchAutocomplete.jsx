import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Button from '@mui/material/Button';

const Root = styled('div')({
  position: 'absolute',
  top: 50,
  left: 50,
  width: '250px', // Set a fixed width for the entire container
  zIndex: 1000,
  background: 'white',
  borderRadius: '20px',
  padding: '20px',
});

const InputRoot = styled('div')({
  '& .MuiInputBase-root': {
    paddingRight: '40px',
  },
  '& .MuiInputAdornment-positionEnd': {
    marginRight: '-10px',
  },
});

const searchBarStyle = {
  width: '100%', // Full width within the container
};

// Static list of options
const staticOptions = [ { label: 'Space', placeId: '1' }, 
  { label: 'NASA', placeId: '2' }, 
  { label: 'Launch', placeId: '3' }, 
  { label: 'Mission', placeId: '4' }, 
  { label: 'Satellites', placeId: '5' }, 
  { label: 'Company', placeId: '6' }, 
  { label: 'Station', placeId: '7' }, 
  { label: 'Earth', placeId: '8' }, 
  { label: 'Spacecraft', placeId: '9' } 
];

export default function SearchAutocomplete({ onPlaceSelected }) {
  const [options, setOptions] = useState(staticOptions);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleInputChange = (event, value) => {
    // Filter options based on input value
    setOptions(
      staticOptions.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handlePlaceSelect = (event, newValue) => {
    if (newValue && newValue.placeId) {
      if (onPlaceSelected && typeof onPlaceSelected === 'function') {
        onPlaceSelected(newValue); // Pass the selected option
      } else {
        console.error('onPlaceSelected is not a function or not defined');
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Root>
        <Autocomplete
          freeSolo
          options={options}
          onInputChange={handleInputChange}
          onChange={handlePlaceSelect}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search..."
              sx={searchBarStyle}
              InputProps={{
                ...params.InputProps,
                className: InputRoot,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
        
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newDate) => setEndDate(newDate)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '16px' }}
        >
          Go on a world tour!
        </Button>

      </Root>
    </LocalizationProvider>
  );
}
