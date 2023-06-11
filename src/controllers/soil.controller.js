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

const getSoilsHandler = async (req, res) => {
  try {
    const { name: type } = req.query

    if (type) {
      const soil = await SoilService.findSoilByQuery({ type })

      if (!soil) {
        return res.status(404).send(createApiResponse(false, null, { name: "Soil not found" }))
      }

      return res.send(createApiResponse(true, soil, null))
    }

    const soils = await SoilService.findSoilsByQuery({})

    const updatedSoils = soils.map(({ id, type }) => ({ id, type } ))

    return res.status(200).send(createApiResponse(true, updatedSoils, null))
  } catch (error) {
    return res.status(500).send(createApiResponse(false, null, error.message))
  }
}

const SoilController = {
  getSoilByIdHandler,
  getSoilsHandler
}

module.exports = SoilController;