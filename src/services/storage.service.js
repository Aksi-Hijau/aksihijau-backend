const { format } = require('util')
const {Storage} = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

SERVICE_ACCOUNT_KEY_PATH = './service-account-key.json'

const storage = new Storage({
  keyFilename: SERVICE_ACCOUNT_KEY_PATH
})

const bucketName = process.env.STORAGE_BUCKET_NAME
const bucket = storage.bucket(bucketName)

const uploadFile = async (file, folder = '') => {
  const fileExtension = path.extname(file.originalname);
  const uniqueFilename = `${uuidv4()}${fileExtension}`
  const blob = bucket.file(`${folder ? folder : ''}/${uniqueFilename}`)
  const blobStream = blob.createWriteStream()

  const imageUri = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`

  blobStream.on('error', err => {
    console.log(err)
  })

  blobStream.on('finish', () => {
    const publicUrl = format(imageUri)
    return publicUrl
  })

  blobStream.end(file.buffer)

  return imageUri
}

const StorageService = {
  uploadFile
}

module.exports = StorageService

