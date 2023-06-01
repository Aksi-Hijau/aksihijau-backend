const { object, number, mixed } = require("yup")

const createDonationSchema = object({
  body: object({
    paymentType: mixed().oneOf(['ewallet', 'bank'], 'Payment should be either ewallet or bank').required('Payment is required'),
    amount: number().when('paymentType', {
      is: 'ewallet',
      then: (schema) => schema.min(100, 'Minimum amount for ewallet is 100').required('Amount is required'),
      otherwise: (schema) => schema.min(10000, 'Minimum amount for bank is 10000').required('Amount is required')
    }),
    paymentMethod: mixed().required("paymentMethod is required").when('paymentType', {
      is: 'ewallet',
      then: (schema) => schema.oneOf(['gopay', 'shopeepay']).required('Payment method is required for ewallet'),
      otherwise: (schema) => schema.oneOf(['bca', 'bni', 'bri']).required('Payment method is required for bank')
    })
  })
});

const DonationSchema = {
  createDonationSchema
}

module.exports = DonationSchema