const { pick } = require("lodash");
const CampaignService = require("../services/campaign.service");
const createApiResponse = require("../utils/createApiResponse");

const campaignHateOasGenerator = (campaign) => {
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
      // Mengubah hasil query menjadi plain object
      const plainCampaign = campaign.get({ plain: true })

      // Menghitung sisa hari
      const deadline = new Date(plainCampaign.deadline)
      const differenceInDays = Math.floor((deadline - currentDate) / (1000 * 60 * 60 * 24))
      
      // Menghitung total donasi
      const collected = plainCampaign.Donations.reduce((total, donation) => total + donation.amount, 0)

      // Menghitung apakah campaign masih aktif
      const active = deadline ? (differenceInDays > 0 ? true : false) : true

      // Generate hateoas
      const hateOas = campaignHateOasGenerator(plainCampaign)

      // delete Donations
      delete plainCampaign.Donations

      // Update campaign
      const updatedCampaign = { ...plainCampaign, collected, remainingDays: differenceInDays, active, _links: hateOas }

      return updatedCampaign
    })

    return res.send(createApiResponse(true, updatedCampaigns, null));
  } catch (error) {
    console.log(error)
    return res.send(createApiResponse(false, null, error.message))
  }
} 

const CampaignController = {
  getCampaignsHandler
}

module.exports = CampaignController;