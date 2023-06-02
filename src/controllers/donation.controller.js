const DonationService = require("../services/donation.service");
const PaymentInstructionService = require("../services/paymentInstruction.service");
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

    const donations = await DonationService.getDonationWithCampaignAndPaymentByInvoice(req.params.invoice, user.id)

    if (!donations) {
      return res.status(404).send(createApiResponse(false, null, { invoice: 'Donation not found' }))
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
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const getDonationInstructionByInvoiceHandler = async (req, res) => {
  try {
    const user = res.locals.user

    const donation = await DonationService.getDonationByInvoice(req.params.invoice, user.id)

    console.log("donation", donation)

    if (!donation) {
      return res.status(404).send(createApiResponse(false, null, { invoice: 'Donation not found' }))
    }

    const paymentInstruction = await PaymentInstructionService.findByPaymentId(donation.paymentId)

    const responseData = {
      payment: {
        invoice: donation.invoice,
        name: donation.payment.name,
        logo: donation.payment.logo,
        vaNumber: donation.vaNumber
      },
      instructions: paymentInstruction
    }

    return res.status(200).send(createApiResponse(true, responseData, null))
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const DonationController = {
  getDonationsHandler,
  getDonationByInvoiceHandler,
  getDonationInstructionByInvoiceHandler
}

module.exports = DonationController;