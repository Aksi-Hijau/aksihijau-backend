const dayjs = require('dayjs');

const addHoursToCurrentTime = (hours) => {
  const currentTime = dayjs();
  const updatedTime = currentTime.add(hours, 'hour');
  return updatedTime.toISOString();
}

module.exports = addHoursToCurrentTime;