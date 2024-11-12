import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/system';

const Root = styled('div')({
  position: 'absolute',
  top: 50,
  left: 50,
  width: '300px',
  zIndex: 1000,
  background: 'white',
  borderRadius: '20px'
});

const InputRoot = styled('div')({
  '& .MuiInputBase-root': {
    paddingRight: '40px',
  },
  '& .MuiInputAdornment-positionEnd': {
    marginRight: '-10px',  // Adjust this value to prevent overlap
  },
});

export default function SearchAutocomplete({ onPlaceSelected }) {
  const [options, setOptions] = useState([]);

  const handleInputChange = async (event, value) => {
    if (!value) return;

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: value }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setOptions(predictions.map((prediction) => ({
          label: prediction.description,
          placeId: prediction.place_id,
        })));
      }
    });
  };

  const handlePlaceSelect = (event, newValue) => {
    if (newValue && newValue.placeId) {
      const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
      placesService.getDetails({ placeId: newValue.placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          if (onPlaceSelected && typeof onPlaceSelected === 'function') {
            onPlaceSelected(place.geometry.location); // Ensure the function is called here
          } else {
            console.error('onPlaceSelected is not a function or not defined');
          }
        }
      });
    }
  };

  return (
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
    </Root>
  );
}
