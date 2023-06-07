const { pick, omit } = require("lodash");
const CampaignService = require("../services/campaign.service");
const StorageService = require("../services/storage.service");
const createApiResponse = require("../utils/createApiResponse");
const DonationService = require("../services/donation.service");
const PaymentService = require("../services/payment.service");
const formattedDate = require("../utils/formattedDate");
const addDaysToCurrentDate = require("../utils/addDaysToCurrentDate");
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
    return res.status(500).send(createApiResponse(false, null, error.message))
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
    const responseData = { ...removeDonationsList, remainingDays, collected, active, latestDonations, _links: hateOas }

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

const getReportsHandler = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ where: { slug: req.params.slug } })

    if (!campaign) {
      return res.status(404).send(createApiResponse(false, null, { slug: 'Campaign not found' }))
    }

    const reports = await CampaignService.getReports(campaign.id)

    const updatedReports = reports.map(report => {
      return {
        id: report.id,
        creatorName: report.user.name,
        creatorImage: report.user.photo,
        title: report.title,
        body: report.body,
        createdAt: report.createdAt,
      }
    })

    return res.send(createApiResponse(true, updatedReports, null));
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const createDonationHandler = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ where: { slug: req.params.slug } })
    
    if (!campaign) {
      return res.status(404).send(createApiResponse(false, null, { slug: 'Campaign not found' }))
    }

    // check payments opstion
    const paymentOption = await PaymentService.getPaymentOptions({ method: req.body.paymentMethod })

    if (!paymentOption) {
      return res.status(404).send(createApiResponse(false, null, { paymentMethod: 'Payment method not found' }))
    }

    const user = res.locals.user
    const { id: userId } = user
    
    const invoice = DonationService.generateInvoiceId("INV")

    const newDonation = { ...req.body, invoice, userId, campaignId: campaign.id, paymentId: paymentOption.id }

    // create payment
    const midtransPayment = await PaymentService.createPaymentMidtrans(newDonation, user)
    
    // create donation
    const donation = await DonationService.createDonation({ ...newDonation, ...midtransPayment })

    // if emoney, then save to paymentActions
    if (newDonation.paymentType === "ewallet") {
      await PaymentService.createPaymentAction({ donationId: donation.id, actions: midtransPayment.actions })
    }

    const responseDonation = {
        invoice: invoice,
        amount: donation.amount,
        donorName: user.name,
        deadline: formattedDate(donation.deadline),
        payment: {
          type: donation.paymentType,
          name: paymentOption.name,
          logo: paymentOption.logo,
        },
    }

    if (donation.paymentType === "bank") {
      responseDonation.payment.bank = {
        type: paymentOption.method,
        vaNumber: donation.vaNumber,
      }
      responseDonation._links = {
        instructions: `/api/donations/${invoice}/instructions`,
      }
    }

    if (donation.paymentType === "ewallet") {
      responseDonation.payment.ewallet = {
        type: paymentOption.method,
        instructions: "incstruction",
        actions: midtransPayment.actions
      }
    }

    return res.status(201).send(createApiResponse(true, responseDonation, null))
  } catch (err) {
    return res.status(500).send(createApiResponse(false, null, err.message))
  }
}

const createCampaignHandler = async (req, res) => {
  try {
    const user = res.locals.user
    const { id: userId } = user

    if (!req.file) {
      return res.status(400).send(createApiResponse(false, null, { image: 'Image is required' }))
    }

    const validImageFormats = ['image/jpg', 'image/jpeg', 'image/png']
    if(!validImageFormats.includes(req.file.mimetype)) {
      return res.status(400).send(createApiResponse(false, null, { image: 'Image must be jpg, jpeg, or png' }))
    }

    // upload image
    const imageUri = await StorageService.uploadImage(req.file, 'campaigns')

    const deadline = addDaysToCurrentDate(req.body.duration)
    
    // create campaign
    const campaign = await CampaignService.createCampaign({ ...req.body, deadline, image: imageUri, userId })

    return res.status(201).send(createApiResponse(true, campaign, null))
  } catch (error) {
    console.log(error)
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const CampaignController = {
  getCampaignsHandler,
  getCampaignBySlugHandler,
  getDonationsHandler,
  getReportsHandler,
  createDonationHandler,
  createCampaignHandler
}

module.exports = CampaignController;