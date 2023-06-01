const { donationDurationInHours } = require("../config/donation")
const { Donation } = require("../models")
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

const DonationService = {
  generateInvoiceId,
  createDonation
}

module.exports = DonationService