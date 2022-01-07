import * as React from 'react';
import classnames from 'classnames';
import { isEqual } from 'lodash';
import { addWeeks, format, parseISO } from 'date-fns';
import NUSModerator, { AcadWeekInfo } from 'nusmoderator';

import { consumeWeeks, WeekRange } from 'types/modules';
import { HoverLesson, ModifiableLesson } from 'types/timetables';
import { OnHoverCell } from 'types/views';

import {
  formatNumericWeeks,
  getHoverLesson,
  getLessonIdentifier,
  LESSON_TYPE_ABBREV,
} from 'utils/timetables';
import elements from 'views/elements';
import Tooltip from 'views/components/Tooltip/Tooltip';
import styles from './TimetableCell.scss';

type Props = {
  showTitle: boolean;
  lesson: ModifiableLesson;
  onHover: OnHoverCell;
  style?: React.CSSProperties;
  onClick?: (position: ClientRect) => void;
  hoverLesson?: HoverLesson | null;
  transparent: boolean;
};

const lessonDateFormat = 'MMM dd';

function formatWeekInfo(weekInfo: AcadWeekInfo) {
  if (weekInfo.type === 'Instructional') return `Week ${weekInfo.num}`;
  return weekInfo.type;
}

function formatWeekRange(weekRange: WeekRange) {
  const start = parseISO(weekRange.start);

  // Start = end means there's just one lesson
  if (weekRange.start === weekRange.end) return format(start, lessonDateFormat);

  let dateRange = `${format(start, lessonDateFormat)}–${format(
    parseISO(weekRange.end),
    lessonDateFormat,
  )}`;

  // If lessons are not weekly, we need to mention that
  if (weekRange.weekInterval) {
    dateRange += `, every ${weekRange.weekInterval} weeks`;
  }

  if (!weekRange.weeks) return dateRange;

  // If the weeks are uneven (ie. there are gaps), we need to use a full table
  // to show all the dates the lesson is on
  const table = (
    <div className={styles.classes}>
      <h5>Classes</h5>
      <ol className={classnames({ [styles.twoColumn]: weekRange.weeks.length > 6 })}>
        {weekRange.weeks.map((week) => {
          const date = addWeeks(start, week - 1);
          const weekInfo = NUSModerator.academicCalendar.getAcadWeekInfo(date);
          return (
            <li key={week}>
              {format(date, lessonDateFormat)}{' '}
              <span className={styles.weekInfo}>({formatWeekInfo(weekInfo)})</span>
            </li>
          );
        })}
      </ol>
    </div>
  );

  return (
    <Tooltip content={table} interactive arrow>
      <span className={styles.weeksSpecial}>{dateRange}</span>
    </Tooltip>
  );
}

/**
 * Smallest unit in timetable.
 * Representing a Nap in this case.
 * 
 * TO-DO: Make more complicated once the generation is there. 
 */
const NapCell = () => {

  const moduleName = "Nap";
  const Cell = 'div'; // props.onClick ? 'button' : 

  return (
    <Cell
    >{moduleName}
    </Cell>
    );
};

export default NapCell;
