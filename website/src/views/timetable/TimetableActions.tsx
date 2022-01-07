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
  toggleNaps: () => void;
};

const sleepTimes = [
  {
    value: '00:00',
    label: '00:00',
  },
  {
    value: '01:00',
    label: '01:00',
  },
  {
    value: '02:00',
    label: '02:00',
  },
  {
    value: 'JPY',
    label: '03:00',
  },
];

const TimetableActions: React.FC<Props> = (props) => (
  
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

    <div className={styles.buttonGroup} role="group" aria-label="Nap generation">
      
      <TextField
        className={styles.textField}
        id="outlined-basic"
        label="Daily hours of sleep"
        variant="outlined"
        size="small"
        style={{ marginLeft: 8 }}
      />

      <TextField
          className={styles.textField}
          size="small"
          id="outlined-select-sleeptime-native"
          select
          label="Daily sleep time"
          SelectProps={{
            native: true,
          }}
          style={{ marginLeft: 8 }}

          //helperText="Please select your currency"
        >
          {sleepTimes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

      <button
          type="button"
          className={classnames(
            styles.calendarBtn,
            elements.examCalendarBtn,
            'btn-outline-primary btn btn-svg',
          )}
      >
      Zz Generate Naps
      </button>
    </div>

    <div className={styles.buttonGroup} role="group" aria-label="Timetable exporting">
      <ExportMenu semester={props.semester} timetable={props.timetable} />

      <ShareTimetable semester={props.semester} timetable={props.timetable} />
    </div>
  </div>
);

export default connect(null, {
  toggleTimetableOrientation,
  toggleTitleDisplay,
})(TimetableActions);
