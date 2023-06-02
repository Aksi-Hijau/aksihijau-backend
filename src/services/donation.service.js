const { donationDurationInHours } = require("../config/donation")
const { Donation, Campaign, Payment } = require("../models")
const addHoursToCurrentTime = require("../utils/addHoursToCurrentTime")

const generateInvoiceId = (prefix) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  return `${prefix}${year}${month}${day}${hour}${minute}${second}${milliseconds}`
}

const createDonation = async(newDonation) => {
  const deadline = addHoursToCurrentTime(donationDurationInHours)
  return Donation.create({
    invoice: newDonation.invoice,
    userId: newDonation.userId,
    campaignId: newDonation.campaignId,
    paymentId: newDonation.paymentId,
    paymentType: newDonation.paymentType,
    paymentMethod: newDonation.paymentMethod,
    vaNumber: newDonation.va_number,
    amount: newDonation.amount,
    status: 'pending',
    deadline: new Date(deadline)
  })
}

const getDonationsUserHistory = async(userId) => {
  const donations = await Donation.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'invoice', 'amount', 'status', 'paidAt', 'createdAt'],
    include: [
      {
        model: Campaign,
        as: 'campaign',
        attributes: ['id', 'image', 'title'],
      }
    ]
  })

  const updatedDonations = donations.map(donation => ({
    invoice: donation.invoice,
    campaignImage: donation.campaign.image,
    campaignTitle: donation.campaign.title,
    amount: donation.amount,
    paidAt: donation.paidAt,
    createdAt: donation.createdAt,
    status: donation.status,
    _links: {
      details: `/api/donations/${donation.invoice}`
    }
  }))

  return updatedDonations
}

const getDonationWithCampaignAndPaymentByInvoice = async(invoice, userId) => {
  const donation = await Donation.findOne({
    where: { invoice, userId },
    attributes: ['id', 'invoice', 'amount', 'status', 'paidAt', 'createdAt'],
    include: [
      {
        model: Campaign,
        as: 'campaign',
        attributes: ['id', 'image', 'title'],
      },
      {
        model: Payment,
        as: 'payment',
        attributes: ['id', 'type', 'name'],
      }
    ]
  })

  return donation
}

const getDonationByInvoice = async (invoice, userId) => {
  if (userId) {
    return Donation.findOne({
      where: { invoice, userId },
      attributes: ['id', 'paymentId', 'invoice', 'amount', 'paymentType', 'paymentMethod', 'vaNumber', 'status', 'paidAt', 'createdAt'],
      include: [
        {
          model: Payment,
          as: 'payment',
          attributes: ['id', 'type', 'logo', 'name'],
        }
      ]
    })
  }

  return Donation.findOne({
    where: { invoice },
    attributes: ['id', 'invoice', 'amount', 'paymentType', 'paymentMethod', 'vaNumber', 'status', 'paidAt', 'createdAt'],
  })
}

const DonationService = {
  generateInvoiceId,
  createDonation,
  getDonationsUserHistory,
  getDonationWithCampaignAndPaymentByInvoice,
  getDonationByInvoice
}

module.exports = DonationService