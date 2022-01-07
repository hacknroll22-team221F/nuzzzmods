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
        renderInput={(params) => <TextField size="small" style={{ marginLeft: 8, marginBottom: 8 }} {...params} />}
      />
    </LocalizationProvider>
  );
}