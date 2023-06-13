const { Donation, User, Campaign } = require("../models");

const getSummary = async () => {
  const successTransactions = await Donation.count({
    where: {
      status: "paid",
    },
  });
  const activeUsers = await User.count({});
  const activeCampaigns = await Campaign.count({
    where: {
      status: "active",
    },
  });
  const pendingCampaigns = await Campaign.count({
    where: {
      status: "pending",
    },
  });
  return {
    successTransactions,
    activeUsers,
    activeCampaigns,
    pendingCampaigns,
  };
};

const SummaryService = {
  getSummary,
};

module.exports = SummaryService;
