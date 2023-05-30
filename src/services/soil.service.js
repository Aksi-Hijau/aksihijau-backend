const Soil = require("../models").Soil;

const findSoilByQuery = async (query) => {
  return Soil.findOne({ where: query });
}

const SoilService = {
  findSoilByQuery,
}

module.exports = SoilService;