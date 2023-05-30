const { pick } = require("lodash");
const CampaignService = require("../services/campaign.service");
const createApiResponse = require("../utils/createApiResponse");

const campaignHateoasGenerator = (campaign) => {
  const hateoas = {
    self: {
      href: `/api/campaigns/${campaign.slug}`,
      method: 'GET'
    },
    donorsWithLimit: {
      href: `/api/campaigns/${campaign.slug}/donors?limit=10`,
      method: 'GET'
    }
  }
  return hateoas
}

const getCampaignsHandler = async (req, res) => {
  try {
    const campaigns = await CampaignService.getCampaigns(req.query);

    const currentDate = new Date();
    
    const updatedCampaigns = campaigns.map(campaign => {
      const deadline = new Date(campaign.deadline)
      const differenceInDays = Math.floor((deadline - currentDate) / (1000 * 60 * 60 * 24))

      const active = differenceInDays > 0 ? true : false

      console.log(campaign)

      const pickedCampaign = pick(campaign, ['id', 'title', 'slug', 'image', 'target', 'updatedAt', 'createdAt'])
      
      // TODO: hitung collected
      const collected = 10000000

      const hateoas = campaignHateoasGenerator(campaign)

      const updatedCampaign = { ...pickedCampaign, collected, remainingDays: differenceInDays, active, _links: hateoas }

      return updatedCampaign
    })

    return res.send(createApiResponse(true, updatedCampaigns, null));
  } catch (error) {
    return res.send(createApiResponse(false, null, error.message))
  }
} 

const CampaignController = {
  getCampaignsHandler
}

module.exports = CampaignController;