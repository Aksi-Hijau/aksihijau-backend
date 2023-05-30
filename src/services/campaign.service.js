const Campaign = require('../models').Campaign;

const getCampaigns = async (query) => {
  return Campaign.findAll({ where: query });
}

const CampaignService = {
  getCampaigns,
}

module.exports = CampaignService;