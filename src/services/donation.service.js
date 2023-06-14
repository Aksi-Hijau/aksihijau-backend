const { Op } = require("sequelize");
const { donationDurationInHours } = require("../config/donation");
const { Donation, Campaign, Payment, sequelize } = require("../models");
const addHoursToCurrentTime = require("../utils/addHoursToCurrentTime");
const formattedDate = require("../utils/formattedDate");

const generateInvoiceId = (prefix) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return `${prefix}${year}${month}${day}${hour}${minute}${second}${milliseconds}`;
};

const createDonation = async (newDonation) => {
  const deadline = addHoursToCurrentTime(donationDurationInHours);
  return Donation.create({
    invoice: newDonation.invoice,
    userId: newDonation.userId,
    campaignId: newDonation.campaignId,
    paymentId: newDonation.paymentId,
    paymentType: newDonation.paymentType,
    paymentMethod: newDonation.paymentMethod,
    vaNumber: newDonation.va_number,
    amount: newDonation.amount,
    status: "pending",
    deadline: new Date(deadline),
  });
};

const getDonationsUserHistory = async (userId) => {
  const donations = await Donation.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
    attributes: ["id", "invoice", "amount", "status", "paidAt", "createdAt"],
    include: [
      {
        model: Campaign,
        as: "campaign",
        attributes: ["id", "image", "title"],
      },
    ],
  });

  const updatedDonations = donations.map((donation) => ({
    invoice: donation.invoice,
    campaignImage: donation.campaign.image,
    campaignTitle: donation.campaign.title,
    amount: donation.amount,
    paidAt: donation.paidAt,
    createdAt: donation.createdAt,
    status: donation.status,
    _links: {
      details: `/api/donations/${donation.invoice}`,
    },
  }));

  return updatedDonations;
};

const getDonationWithCampaignAndPaymentByInvoice = async (invoice, userId) => {
  const donation = await Donation.findOne({
    where: { invoice, userId },
    include: [
      {
        model: Campaign,
        as: "campaign",
        attributes: ["id", "image", "title"],
      },
      {
        model: Payment,
        as: "payment",
        attributes: ["id", "type", "name"],
      },
    ],
  });

  return donation;
};

const getDonationByInvoice = async (invoice, userId) => {
  if (userId) {
    return Donation.findOne({
      where: { invoice, userId },
      attributes: [
        "id",
        "paymentId",
        "invoice",
        "amount",
        "paymentType",
        "paymentMethod",
        "vaNumber",
        "status",
        "paidAt",
        "createdAt",
      ],
      include: [
        {
          model: Payment,
          as: "payment",
          attributes: ["id", "type", "logo", "name"],
        },
      ],
    });
  }

  return Donation.findOne({
    where: { invoice },
    attributes: [
      "id",
      "invoice",
      "amount",
      "paymentType",
      "paymentMethod",
      "vaNumber",
      "status",
      "paidAt",
      "createdAt",
    ],
  });
};

const updateDonationByInvoice = async (invoice, updatedData) => {
  const donation = await Donation.findOne({ where: { invoice } });
  if (!donation) {
    return false;
  }
  await donation.update(updatedData);
  return true;
};

const getDonationsLastYear = async () => {
  const currentYear = new Date().getFullYear();
  const lastYearStart = new Date(currentYear - 1, 0, 1);
  const lastYearEnd = new Date(currentYear - 1, 11, 31);

  console.log('lastYearStart', formattedDate(lastYearStart))
  console.log('lastYearEnd', formattedDate(lastYearEnd))

  const donations = await Donation.findAll({
    attributes: [
      [
        sequelize.fn(
          "DATE_FORMAT",
          sequelize.col("donation.createdAt"),
          "%m/%d/%Y"
        ),
        "date",
      ],
      [sequelize.fn("SUM", sequelize.col("donation.amount")), "total"],
    ],
    where: {
      createdAt: {
        [Op.between]: [lastYearStart, lastYearEnd],
      },
      status: "paid",
    },
    group: "date",
    raw: true,
  });
  
  return donations
};

const DonationService = {
  generateInvoiceId,
  createDonation,
  getDonationsUserHistory,
  getDonationWithCampaignAndPaymentByInvoice,
  getDonationByInvoice,
  updateDonationByInvoice,
  getDonationsLastYear,
};

module.exports = DonationService;
