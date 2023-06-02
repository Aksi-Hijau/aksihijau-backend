const DonationService = require("../services/donation.service");
const createApiResponse = require("../utils/createApiResponse");

const getDonationsHandler = async (req, res) => {
  try {
    const user = res.locals.user

    const donations = await DonationService.getDonationsUserHistory(user.id)

    return res.send(createApiResponse(true, donations, null))
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const getDonationByInvoiceHandler = async (req, res) => {
  try {
    const user = res.locals.user

    const donations = await DonationService.getDonationByInvoice(req.params.invoice, user.id)

    if (!donations) {
      return res.status(404).send(createApiResponse(false, null, 'Donation not found'))
    }

    const updatedDonations = {
      invoice: donations.invoice,
      campaignImage: donations.campaign.image,
      campaignTitle: donations.campaign.title,
      amount: donations.amount,
      payment: donations.payment,
      status: donations.status,
      paidAt: donations.paidAt,
      createdAt: donations.createdAt,
      _links: {
        instructions: `/api/donations/${donations.invoice}/instructions`
      }
    }

    return res.send(createApiResponse(true, updatedDonations, null))
  } catch (error) {
    console.log(error)
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const DonationController = {
  getDonationsHandler,
  getDonationByInvoiceHandler
}

module.exports = DonationController;