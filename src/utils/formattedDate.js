const dayjs = require('dayjs');
require('dayjs/locale/id');

// Konversi waktu ke format yang diinginkan
const formattedDate = (inputDate) => {
  const outputFormat = 'dddd, DD MMMM YYYY HH:mm'
  return dayjs(inputDate).locale('id').format(outputFormat)
};

module.exports = formattedDate;
