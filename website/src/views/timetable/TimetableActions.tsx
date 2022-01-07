import * as React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { TextField } from '@mui/material';

import { toggleTimetableOrientation, toggleTitleDisplay } from 'actions/theme';
import { Semester } from 'types/modules';
import { SemTimetableConfig } from 'types/timetables';

import { Calendar, Grid, Sidebar, Type } from 'react-feather';
import elements from 'views/elements';
import config from 'config';
import ShareTimetable from './ShareTimetable';
import ExportMenu from './ExportMenu';
import SleepTimePicker from './SleepTimePicker';

import styles from './TimetableActions.scss';

type Props = {
  semester: Semester;
  timetable: SemTimetableConfig;

  isVerticalOrientation: boolean;
  toggleTimetableOrientation: () => void;

  showTitle: boolean;
  toggleTitleDisplay: () => void;

  showExamCalendar: boolean;
  toggleExamCalendar: () => void;

  hasNaps: boolean;
  toggleNaps: () => void;
};

function generateNaps(toggleNaps: () => void) {
  toggleNaps();
}

const TimetableActions: React.FC<Props> = (props) => {
  const [sleepHours, setSleepHours] = React.useState("0");
  const [hasError, setHasError] = React.useState(false);

  const handleChangeSleep = (value:string) => {
    setSleepHours(value);
  }

  const handleSubmitSleep = () => {
    let sleep = parseInt(sleepHours);

    if (isNaN(sleep) || sleep > 24) {
      setHasError(true);
    } else {
      localStorage.setItem("sleepHours", sleep);
      setHasError(false);
      setSleepHours("0");
    }
  }

  return (
    <div
      className="btn-toolbar justify-content-between"
      role="toolbar"
      aria-label="Timetable utilities"
    >
      <div className={styles.buttonGroup} role="group" aria-label="Timetable manipulation">
        <button
          type="button"
          className={classnames('btn btn-outline-primary btn-svg')}
          onClick={props.toggleTimetableOrientation}
          disabled={props.showExamCalendar}
        >
          <Sidebar className={styles.sidebarIcon} />
          {props.isVerticalOrientation ? 'Horizontal Mode' : 'Vertical Mode'}
        </button>

        {!props.isVerticalOrientation && (
          <button
            type="button"
            className={classnames(styles.titleBtn, 'btn-outline-primary btn btn-svg')}
            onClick={props.toggleTitleDisplay}
            disabled={props.showExamCalendar}
          >
            <Type className={styles.titleIcon} />
            {props.showTitle ? 'Hide Titles' : 'Show Titles'}
          </button>
        )}

        {config.examAvailabilitySet.has(props.semester) && (
          <button
            type="button"
            className={classnames(
              styles.calendarBtn,
              elements.examCalendarBtn,
              'btn-outline-primary btn btn-svg',
            )}
            onClick={props.toggleExamCalendar}
          >
            {props.showExamCalendar ? (
              <>
                <Grid className="svg svg-small" /> Timetable
              </>
            ) : (
              <>
                <Calendar className="svg svg-small" /> Exam Calendar
              </>
            )}
          </button>
        )}
      </div>

      <div className={styles.textField} role="group" aria-label="Nap generation">
        
          <TextField
            id="outlined-basic"
            label="Daily hours of sleep"
            variant="outlined"
            size="small"
            style={{ marginLeft: 8, marginBottom: 8 }}
            color="warning"
            onChange={(input) => handleChangeSleep(input.target.value)}
            error={hasError}
            helperText={hasError ? "Input should only consist of integers and should be less than 24 hours" : ""}
          />
          <button 
            type="button"
            className={classnames(
              styles.calendarBtn,
              elements.examCalendarBtn,
              'btn-outline-primary btn btn-svg',
            )}
            onClick={handleSubmitSleep}>Confirm Sleep Hours</button>

        <SleepTimePicker/>

        <button
            type="button"
            className={classnames(
              styles.calendarBtn,
              elements.examCalendarBtn,
              'btn-outline-primary btn btn-svg',
            )}
            onClick={() => generateNaps(props.toggleNaps)}
        >
          {props.hasNaps ? "Clear Naps" : "Zz Generate Naps"}
          </button>
      </div>

      <div className={styles.buttonGroup} role="group" aria-label="Timetable exporting">
        <ExportMenu semester={props.semester} timetable={props.timetable} />

        <ShareTimetable semester={props.semester} timetable={props.timetable} />
      </div>
    </div>
  )
};

export default connect(null, {  
  toggleTimetableOrientation,
  toggleTitleDisplay,
})(TimetableActions);
