const Multer = require('multer');

const multerConfig = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  }
})

module.exports = multerConfig;