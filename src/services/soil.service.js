const Soil = require("../models").Soil;

const findSoilByQuery = async (query) => {
  return Soil.findOne({ where: query });
}

const checkSoilId = async (soilId) => {
  const soil = await findSoilByQuery({ id: soilId });
  return soil !== null;
}

const SoilService = {
  findSoilByQuery,
  checkSoilId
}

module.exports = SoilService;