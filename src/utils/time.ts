import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export const formatTime = ({ time = dayjs(), format = 'YYYY-MM-DD' }: { time?: string | number | Date | Dayjs; format?: string | boolean }) => {
    const datetime = dayjs(time).locale('zh-cn');
    return typeof format === 'string' ? datetime.format(format) : datetime;
};

export const calculateDayDiff = (startTime: dayjs.ConfigType, endTime: dayjs.ConfigType) => dayjs(startTime).diff(dayjs(endTime), 'day');

export { dayjs };
