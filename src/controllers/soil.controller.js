const SoilService = require("../services/soil.service")
const createApiResponse = require("../utils/createApiResponse")

const getSoilByIdHandler = async (req, res) => {
  const { id } = req.params
  
  try {
    const soil = await SoilService.findSoilByQuery({ id })

    if (!soil) {
      return res.status(404).send(createApiResponse(false, null, { id: "Soil not found" }))
    }

    return res.status(200).send(createApiResponse(true, soil, null))
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const SoilController = {
  getSoilByIdHandler,
}

module.exports = SoilController;