const { result } = require("lodash")
const PaymentService = require("../services/payment.service")
const createApiResponse = require("../utils/createApiResponse")

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

const PaymentController = {
  getPaymentsHandler
}

module.exports = PaymentController