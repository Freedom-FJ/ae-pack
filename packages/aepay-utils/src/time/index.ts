import dayjs from 'dayjs';
import dayjs_timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

// 设置默认时区为 GMT+8
dayjs.extend(utc);
dayjs.extend(dayjs_timezone);
dayjs.extend(advancedFormat);
dayjs.tz.setDefault(getTimezone());

export function getTimezone() {
  return 'America/Los_Angeles';
}

// 获取当前美西时间
export function getPSTNow(): dayjs.Dayjs {
  return dayjs().tz(getTimezone());
}

/**
 * 时区转换
 * @param time
 * @param timezone
 * @returns
 */
export const parseTimezoneTime = (
  time: dayjs.Dayjs | string,
  timezone: string = getTimezone()
) => {
  return time && dayjs.tz(dayjs(time).valueOf(), timezone);
};

// 获取时区缩写 
export function getTimezoneAbbreviation() {
  const date = getPSTNow();

  const str = date.format('z');
  if (str === 'PST' || str === 'PDT') {
    return 'PST';
  } else if (str === 'CET' || str === 'CEST') {
    return 'CEST';
  } else {
    var result = date.utcOffset() / 60;
    if (result >= 0) {
      return `GMT+${result}`;
    } else {
      return `GMT${result}`;
    }
  }
};

// 格式化时间
export function formatTime(value?: string | dayjs.Dayjs, format = 'YYYY/MM/DD', defaultValue = '-'): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value) {
    return dayjs(value).tz(getTimezone()).format(format);
  }

  return defaultValue;
}