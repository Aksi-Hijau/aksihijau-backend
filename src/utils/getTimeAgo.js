const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const relativeTime = require('dayjs/plugin/relativeTime');
const idLocale = require('dayjs/locale/id'); // Contoh pengaturan bahasa Indonesia

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.locale(idLocale); // Setel bahasa menjadi Indonesia

const getTimeAgo = (timestamp) => {
  const dateTime = dayjs(timestamp);
  const timeAgo = dateTime.fromNow();
  return timeAgo;
};

module.exports = getTimeAgo;
