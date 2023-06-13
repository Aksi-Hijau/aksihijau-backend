const SummaryService = require("../services/summary.service");
const createApiResponse = require("../utils/createApiResponse");

const getSummaryHandler = async (req, res) => {
  try {
    const {
      successTransactions,
      activeUsers,
      activeCampaigns,
      pendingCampaigns,
    } = await SummaryService.getSummary();

    return res.send(
      createApiResponse(
        true,
        {
          successTransactions,
          activeUsers,
          activeCampaigns,
          pendingCampaigns,
        },
        null
      )
    );
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message));
  }
};

const SummaryController = {
  getSummaryHandler,
};

module.exports = SummaryController;
