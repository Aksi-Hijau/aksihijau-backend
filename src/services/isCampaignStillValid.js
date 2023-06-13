// using local
const dayjs = require('dayjs');
require('dayjs/locale/id');

const isCampaignStillValid = (deadline) => {
  // using day js
  const now = dayjs();

  const deadlineDate = dayjs(deadline);

  if (now.isAfter(deadlineDate)) {
    return false;
  }

  return true;
}

module.exports = isCampaignStillValid;