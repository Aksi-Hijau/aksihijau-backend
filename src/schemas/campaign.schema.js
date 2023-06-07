const { object, string, number, mixed } = require("yup")
const SoilService = require("../services/soil.service")
const CampaignService = require("../services/campaign.service")

const createCampaignSchema = object({
  body: object({
    title: string().required('Title is required'),
    target: number().required('Target is required'),
    duration: number().required('Duration is required'),
    slug: string().required('Slug is required').test('is-unique-slug', 'Slug already exists', async function (value) {
      const isExist = await CampaignService.isExistCampaign(value)
      return !isExist
    }),
    description: string().required('Description is required'),
    soilId: number().required('Soil id is required').test('is-valid-soilId', 'Invalid soilId', async function (value) {
      const isValidSoilId = await SoilService.checkSoilId(value)
      return isValidSoilId
    }),
  }),
})

const CampaignSchema = {
  createCampaignSchema
}

module.exports = CampaignSchema
