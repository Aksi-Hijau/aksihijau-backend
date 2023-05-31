const getTimeAgo = require("../utils/getTimeAgo");
const { Report, Campaign, Donation, User, Soil, Sequelize } = require("../models");
const { set } = require('lodash')

const getCampaigns = async (query) => {
  return Campaign.findAll({
    limit: query.limit ? parseInt(query.limit) : null,
    attributes: [
      "id",
      "title",
      "slug",
      "image",
      "target",
      "deadline",
      "updatedAt",
      "createdAt",
    ],
    include: [
      {
        model: Donation,
        attributes: ["amount"],
        where: { status: "paid" },
        required: false,
        as: "donations",
      },
    ],
  });
};

const getCampaignBySlug = async (slug) => {
  try {
    const campaign = await Campaign.findOne({
      where: { slug },
      attributes: [
        "id",
        "soilId",
        "slug",
        "title",
        "image",
        "target",
        "deadline",
        "description",
        "updatedAt",
        "createdAt",
        [
          Sequelize.fn('COUNT', Sequelize.col('reports.id')),
          'reportsCount'
        ],
      ],
      include: [
        {
          model: Donation,
          attributes: ["amount"],
          where: { status: "paid" },
          required: false,
          as: 'donations'
        },
        {
          model: User,
          attributes: ["photo", "name"],
          as: "fundraiser"
        },
        {
          model: Soil,
          attributes: ["id", "type", "image"],
          as: "soil"
        },
        {
          model: Report,
          attributes: [],
          as: "reports"
        },
      ],
      group: ['Campaign.id', 'donations.id', 'fundraiser.id', 'soil.id']
    });
    
    const reportsCount = campaign.dataValues.reportsCount;
    const donationsCount = campaign.dataValues.donations.length;

    set(campaign, 'dataValues.reportsCount', reportsCount)
    set(campaign, 'dataValues.donationsCount', donationsCount)

    return campaign;
  } catch (error) {
    throw error;
  }
};

const getLatestDonations = async (campaignId, limit) => {
  const donations =  await Donation.findAll({
    where: { campaignId, status: "paid" },
    limit: limit ? parseInt(limit) : null,
    order: [["paidAt", "DESC"]],
    attributes: ["id", "amount", "paidAt"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "photo"],
        as: "user",
      },
    ],
  })

  const formattedDonations = donations.map(donation => {
    const { id, amount, paidAt, user } = donation.get({ plain: true })
    const { name, photo: image } = user

    const paidAtDate = new Date(paidAt)
    const formattedPaidAt = getTimeAgo(paidAtDate)

    return { id, amount, paidAt: formattedPaidAt, name, image }
  })

  return formattedDonations
}

const getReports = async (campaignId) => {
  return Report.findAll({
    where: { campaignId },
    attributes: ["id", "title", "body", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["id", "name", "photo"],
        as: "user",
      },
    ],
  })
}

const CampaignService = {
  getCampaigns,
  getCampaignBySlug,
  getLatestDonations,
  getReports
};

module.exports = CampaignService;
