const Soil = require("../models").Soil;

const findSoilByQuery = async (query) => {
  return Soil.findOne({ where: query });
};

const checkSoilId = async (soilId) => {
  const soil = await findSoilByQuery({ id: soilId });
  return soil !== null;
};

const findSoilsByQuery = async (query) => {
  return Soil.findAll({ where: query });
};

const SoilService = {
  findSoilByQuery,
  checkSoilId,
  findSoilsByQuery,
  findSoilByQuery
};

module.exports = SoilService;
