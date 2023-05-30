const Campaign = require('../models').Campaign;
const Donation = require('../models').Donation;

const getCampaigns = async (query) => {
  return Campaign.findAll({
    limit: query.limit ? parseInt(query.limit) : null,
    attributes: ['id', 'title', 'slug', 'image', 'target', 'deadline', 'updatedAt', 'createdAt'],
    include: [{
      model: Donation,
      attributes: ['amount'],
      where: { status: 'paid' },
      required: false,
    }],
  });
}

const CampaignService = {
  getCampaigns,
}

module.exports = CampaignService;