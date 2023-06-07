const PaymentService = require("../services/payment.service")
const createApiResponse = require("../utils/createApiResponse")
const DonationService = require("../services/donation.service")
const { midtransServerKey } = require("../config/payments")
const crypto = require('crypto')

const getPaymentsHandler = async (req, res) => {
  try {
    const payments = await PaymentService.getPayments({})

    const results = {
      ewallet: [],
      bank: [],
    }

    payments.forEach(payment => {
      if (payment.type === "ewallet") {
        results.ewallet.push(payment)
      }
      if (payment.type === "bank") {
        results.bank.push(payment)
      }
    })

    return res.send(createApiResponse(true, results, null))
  } catch(err) {
    return res.status(500).send(createApiResponse(false, null, err.message))
  }
}

const generateHash = (order_id, status_code, gross_amount) => {
  const hash = crypto.createHash("sha512")
  const signatureKey = order_id + status_code + gross_amount + midtransServerKey
  hash.update(signatureKey)
  const signature = hash.digest("hex")
  return signature
}

const midtransCallback = async (req, res) => {
  const { transaction_status, order_id, signature_key, status_code, gross_amount } = req.body

  const statuses = {
    "settlement": "paid",
    "capture": "paid",
    "deny": "failed",
    "cancel": "failed",
    "expire": "failed",
    "pending": "pending"
  }

  console.log(req.body)

  try {
    if(!(generateHash(order_id, status_code, gross_amount) === signature_key)) {
      return res.status(400).send(createApiResponse(false, null, "Invalid signature"))
    }

    const donation = await DonationService.updateDonationByInvoice(order_id, { status: statuses[transaction_status] })

    if (!donation) {
      return res.status(404).send(createApiResponse(false, null, 'Donation not found'))
    }
    
    return res.status(201).send(createApiResponse(true, donation, null))
  } catch (error) {
    console.log(error)
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const PaymentController = {
  getPaymentsHandler,
  midtransCallback
}

module.exports = PaymentController