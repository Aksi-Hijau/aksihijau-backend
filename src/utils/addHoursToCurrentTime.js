const dayjs = require('dayjs');
const formattedDate = require('./formattedDate');
const { donationDurationInHours } = require('../config/donation');

const addHoursToCurrentTime = (hours) => {
  const currentTime = dayjs();
  const updatedTime = currentTime.add(hours, 'hour');
  return updatedTime.toISOString();
}

const addedDate = addHoursToCurrentTime(donationDurationInHours)

console.log(formattedDate(addedDate))

module.exports = addHoursToCurrentTime;