import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

import classnames from 'classnames';
import styles from './TimetableActions.scss';
import elements from 'views/elements';

export default function SleepTimePicker() {
  const [value, setValue] = React.useState(null);

  const handleClick = () => {
    console.log("Daily Sleep Time:",value);
    localStorage.setItem("sleepTime", value.toString());
    //setValue(null);
  }

  return (
    <div className={styles.textField} role="group" aria-label="Nap generation">
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
        renderInput={(params) => 
        <TextField size="small" color="warning" style={{ marginLeft: 8 }} {...params} />
      }
      />
    </LocalizationProvider>
    <button 
      type="button"
      className={classnames(
        styles.calendarBtn,
        elements.examCalendarBtn,
        'btn-outline-primary btn btn-svg',
      )}
      onClick={handleClick}
    >Confirm sleep time</button>
    </div>
    
    
  );
}