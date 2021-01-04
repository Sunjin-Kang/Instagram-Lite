const Cloud = require('@google-cloud/storage')
const { Storage } = Cloud
const config = require('../config')

const storage = new Storage({
    keyFilename: config.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: config.PROJECT_ID
})

const util = require('util')
const bucket = storage.bucket(config.GCP_STORAGE_NAME)
const { format } = util
/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */
const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file
  const blob = bucket.file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})
module.exports = uploadImage