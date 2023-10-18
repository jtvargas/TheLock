import dayjs, { Dayjs } from 'dayjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isNaN from 'lodash/isNaN';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekOfYear);

const getDateInDayJs = (varDate?: Date | number | string | Dayjs): Dayjs => {
  if (varDate) {
    if (isNumber(varDate)) {
      return dayjs.unix(varDate);
    }

    if (isString(varDate) && !isNaN(+varDate)) {
      return dayjs.unix(+varDate);
    }

    return dayjs.isDayjs(varDate) ? varDate : dayjs(varDate);
  }

  return dayjs();
};

const formatDate = (
  varDate: Date | number | string | Dayjs | undefined,
  format?: string,
): string => {
  const dateToFormat = getDateInDayJs(varDate || new Date());
  const today = dayjs();

  if (dateToFormat.isSame(today, 'day')) {
    return 'Today';
  }

  if (dateToFormat.isSame(today.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }

  if (
    dateToFormat.isSameOrBefore(today, 'week') &&
    dateToFormat.isSameOrAfter(today.startOf('week'), 'day')
  ) {
    return 'This Week';
  }

  if (
    dateToFormat.isSameOrBefore(
      today.subtract(1, 'week').endOf('week'),
      'day',
    ) &&
    dateToFormat.isSameOrAfter(today.subtract(1, 'week').startOf('week'), 'day')
  ) {
    return 'Last Week';
  }

  return dateToFormat.format(format || 'MM-DD-YYYY');
};

const getTimeLapsed = (startPlayTime: number, endPlayTime: number): string => {
  const starPlayTimeDayJs = getDateInDayJs(startPlayTime);
  const endPlayTimeDayJs = getDateInDayJs(endPlayTime);
  const diff = dayjs.duration(endPlayTimeDayJs.diff(starPlayTimeDayJs));

  const hours = String(diff.hours()).padStart(2, '0');
  const minutes = String(diff.minutes()).padStart(2, '0');
  const seconds = String(diff.seconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

const isDayJs = dayjs.isDayjs;

export default {
  getDateInDayJs,
  formatDate,
  isDayJs,
  getTimeLapsed,
};
