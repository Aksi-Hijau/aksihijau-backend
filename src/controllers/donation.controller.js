const DonationService = require("../services/donation.service");
const createApiResponse = require("../utils/createApiResponse");

const getDonationsHandler = async (req, res) => {
  try {
    const user = res.locals.user

    const donations = await DonationService.getDonationsUserHistory(user.id)

    return res.send(createApiResponse(true, donations, null))
  } catch (error) {
    console.log(error)
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const DonationController = {
  getDonationsHandler
}

module.exports = DonationController;