const getTimeAgo = require("../utils/getTimeAgo");

const Campaign = require("../models").Campaign;
const Donation = require("../models").Donation;
const User = require("../models").User;
const Soil = require("../models").Soil;

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
        }
      ],
    });

    return campaign
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

const CampaignService = {
  getCampaigns,
  getCampaignBySlug,
  getLatestDonations
};

module.exports = CampaignService;
