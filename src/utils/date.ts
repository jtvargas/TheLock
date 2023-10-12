import dayjs, { Dayjs } from 'dayjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import duration from 'dayjs/plugin/duration';

import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isNaN from 'lodash/isNaN';

dayjs.extend(duration);

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
  format: string,
): string => {
  return dayjs(varDate || new Date()).format(format);
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
