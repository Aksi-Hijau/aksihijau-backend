const axios = require("axios");

async function imageUrlToBlob(imageUrl) {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  const file = {
    fieldname: "image",
    originalname: "desc-image.jpg",
    encoding: "7bit",
    mimetype: response.headers["content-type"],
    buffer: Buffer.from(response.data, "binary"),
    size: response.headers["content-length"],
  };

  return file;
}

module.exports = imageUrlToBlob;
