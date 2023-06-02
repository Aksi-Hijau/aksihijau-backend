const { PaymentInstruction } = require('../models')

const findByPaymentId = async (paymentId) => {
  const paymentInstruction = await PaymentInstruction.findAll({
    where: { paymentId },
    attributes: ['title', 'body']
  })

  return paymentInstruction
}

const PaymentInstructionService = {
  findByPaymentId
}

module.exports = PaymentInstructionService