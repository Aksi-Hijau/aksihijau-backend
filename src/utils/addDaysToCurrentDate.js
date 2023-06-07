const dayjs = require('dayjs');

const addDaysToCurrentDate = (days) => {
  const currentTime = dayjs();
  const updatedTime = currentTime.add(days, 'day');
  return updatedTime.toISOString();
}

module.exports = addDaysToCurrentDate;