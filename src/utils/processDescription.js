const cheerio = require("cheerio");
const StorageService = require("../services/storage.service");
const imageUrlToBlob = require("./imageUrlToBlob");

const processDescription = async (description) => {
  const $ = cheerio.load(description);
  const imgElements = $("img");

  // Membuat array untuk menyimpan promise upload gambar
  const uploadPromises = imgElements
    .map(async (index, element) => {
      const imageUrl = $(element).attr("src");
      const blobImage = await imageUrlToBlob(imageUrl);
      console.log("blob image", blobImage);

      // Simpan gambar ke storage dan dapatkan URL baru
      const newImageUrl = await StorageService.uploadFile(
        blobImage,
        "campaigns/description"
      );

      // Perbarui atribut src elemen gambar dengan URL baru
      $(element).attr("src", newImageUrl);

      // Tambahkan atribut style="width: 100%" pada elemen gambar
      $(element).attr("style", "width: 100%");
    })
    .get();

  // Tunggu hingga semua promise upload selesai
  await Promise.all(uploadPromises);

  // Mengembalikan deskripsi yang telah diproses
  return $.html();
};

module.exports = processDescription;
