const BankTransfer = require("../payments/BankTransfer")
const { BankPayment, Payment, PaymentAction } = require("../models")
const EWalletPayment = require("../payments/EWalletPayment")

const createPaymentMidtrans = async (newDonation, user) => {
  const { invoice, amount, paymentType, paymentMethod } = newDonation
  const { name, email } = user

  const itemDetails = {
    id: invoice,
    price: amount,
    quantity: 1,
    name: 'Donation'
  }

  const customerDetails = {
    first_name: name,
    email
  }

  const newTransaction = {
    invoice, amount, paymentType, name, email, customerDetails, itemDetails, paymentMethod
  }

  try {
    if (paymentType === "bank") {
      const midtransResponse = await createBankTransfer(newTransaction)
      return midtransResponse
    }
    if (paymentType === "ewallet") {
      const midtransResponse = await createEwalletPayment(newTransaction)
      return midtransResponse
    }
  } catch (error) {
    throw error
  }
}

const createBankTransfer = async (newTransaction) => {
  try {
    const core = new BankTransfer({
      payment_type: newTransaction.paymentType,
      order_id: newTransaction.invoice,
      amount: newTransaction.amount,
      item_details: newTransaction.itemDetails,
      customer_details: newTransaction.customerDetails,
      bank: newTransaction.paymentMethod,
    })
    const midtransResponse = await core.charge()
    return midtransResponse
  } catch (error) {
    throw error
  }
}

const createEwalletPayment = async (newTransaction) => {
  try {
    const core = new EWalletPayment({
      order_id: newTransaction.invoice,
      amount: newTransaction.amount,
      item_details: newTransaction.itemDetails,
      customer_details: newTransaction.customerDetails,
      emoney: newTransaction.paymentMethod,
    })
    const midtransResponse = await core.charge()
    return midtransResponse
  } catch (error) {
    throw error
  }
}


const getPaymentOptions = async (query) => {
    return Payment.findOne({
      where: query
    })
}

const createPaymentAction = ({ donationId, actions }) => {
  return PaymentAction.bulkCreate(actions.map(action => ({ ...action, donationId })))
}

const PaymentService = {
  createPaymentMidtrans,
  createBankTransfer,
  getPaymentOptions,
  createEwalletPayment,
  createPaymentAction
}

module.exports = PaymentService