const { pick, omit } = require("lodash");
const CampaignService = require("../services/campaign.service");
const createApiResponse = require("../utils/createApiResponse");
const Campaign = require("../models").Campaign;

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

const calculateRemainingDays = (deadline) => {
  const currentDate = new Date();
  const dateDeadline = new Date(deadline);
  const differenceInDays = Math.floor((new Date(dateDeadline) - currentDate) / (1000 * 60 * 60 * 24))
  return differenceInDays
}

const getCampaignsHandler = async (req, res) => {
  try {
    const campaigns = await CampaignService.getCampaigns(req.query);
    
    const updatedCampaigns = campaigns.map(campaign => {
      // Mengubah hasil query menjadi plain object
      const plainCampaign = campaign.get({ plain: true })

      // Menghitung sisa hari
      const remainingDays = calculateRemainingDays(plainCampaign.deadline)
      
      // Menghitung total donasi
      const collected = plainCampaign.donations.reduce((total, donation) => total + donation.amount, 0)

      // Menghitung apakah campaign masih aktif
      const active = plainCampaign.deadline ? (remainingDays > 0 ? true : false) : true

      // Generate hateoas
      const hateOas = campaignHateOasGenerator(plainCampaign)

      // delete donations
      delete plainCampaign.donations

      // Update campaign
      const updatedCampaign = { ...plainCampaign, collected, remainingDays, active, _links: hateOas }

      return updatedCampaign
    })

    return res.send(createApiResponse(true, updatedCampaigns, null));
  } catch (error) {
    console.log(error)
    return res.send(createApiResponse(false, null, error.message))
  }
}

const getCampaignBySlugHandler = async (req, res) => {
  const { slug } = req.params
  try {
    const campaign = await CampaignService.getCampaignBySlug(slug);

    if (!campaign) {
      return res.status(404).send(createApiResponse(false, null, { slug: 'Campaign not found' }))
    }

    const plainCampaign = campaign.get({ plain: true })

    const remainingDays = calculateRemainingDays(plainCampaign.deadline)

    const collected = plainCampaign.donations.reduce((total, donation) => total + donation.amount, 0)
    
    const active = plainCampaign.deadline ? (remainingDays > 0 ? true : false) : true

    // TODO: Bikin count of reports
    const countOfReports = 10

    const latestDonations = await CampaignService.getLatestDonations(plainCampaign.id, 3)

    const hateOas = {
      donate: {
        href: `/api/campaigns/${plainCampaign.slug}/donations`,
        method: "POST"
      },
      donations: {
        href: `/api/campaigns/${plainCampaign.slug}/donations`,
        method: "GET"
      },
      reports: {
        href: `/api/campaigns/${plainCampaign.slug}/reports`,
        method: "GET"
      },
      soilDetails: {
        href: `/api/soils/${plainCampaign.soilId}`
      }
    }

    const removeDonationsList = omit(plainCampaign, ['donations'])
    const responseData = { ...removeDonationsList, remainingDays, collected, active, latestDonations, countOfReports, _links: hateOas }

    return res.send(createApiResponse(true, responseData, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message));
  }
}

const getDonationsHandler = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ where: { slug: req.params.slug } })

    if (!campaign) {
      return res.status(404).send(createApiResponse(false, null, { slug: 'Campaign not found' }))
    }

    const donations = await CampaignService.getLatestDonations(campaign.id)

    return res.send(createApiResponse(true, donations, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message));
  }
}

const CampaignController = {
  getCampaignsHandler,
  getCampaignBySlugHandler,
  getDonationsHandler
}

module.exports = CampaignController;