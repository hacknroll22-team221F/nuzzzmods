import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

export default function BasicTimePicker() {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Daily sleep time"
        value={value}
        minutesStep={30}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        shouldDisableTime={(timeValue, clockType) => {
            if (clockType === 'minutes' && timeValue % 30) {
              return true;
            }

            return false;
          }}
        renderInput={(params) => <TextField size="small" color="warning" style={{ marginLeft: 8 }} {...params} />}
      />
    </LocalizationProvider>
  );
}