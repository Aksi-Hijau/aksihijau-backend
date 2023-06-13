const { Donation, User, Campaign } = require("../models");

const getSummary = async () => {
  const successTransactions = await Donation.count({
    where: {
      status: "paid",
    },
  });
  const activeUsers = await User.count({});
  const activeCampaigns = await Campaign.count({});
  const pendingCampaigns = 0;
  return {
    successTransactions,
    activeUsers,
    activeCampaigns,
    pendingCampaigns,
  };
}

const SummaryService = {
  getSummary,
};

module.exports = SummaryService;