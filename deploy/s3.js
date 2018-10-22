const fs = require('fs')

const AWS = require('aws-sdk')
const mime = require('mime')

class S3 {
  constructor(bucketName) {
    this.s3 = new AWS.S3({
      params: { Bucket: bucketName }
    })
  }

  deleteObject(key) {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject({ Key: key }, (error) => {
        if (error) return reject(error)

        resolve()
      })
    })
  }

  uploadFile(fileName, filePath) {
    const buffer = fs.readFileSync(filePath)
    const contentType = mime.getType(fileName)

    return this.uploadBuffer(buffer, fileName, contentType)
  }

  uploadBuffer(buffer, fileName, contentType) {
    return new Promise((resolve, reject) => {
      const params = {
        Key: fileName,
        Body: buffer,
        ACL: 'public-read',
        ContentType: contentType
      }

      this.s3.putObject(params, (error) => {
        if (error) return reject(error)

        console.log(`${fileName} uploaded!`)
        resolve()
      })
    })
  }

  checkIfFileExists(fileName) {
    return new Promise((resolve, reject) => {
      this.s3.headObject(
        {
          Key: fileName
        },
        (err) => {
          if (err && err.code === 'NotFound') {
            return resolve(false)
          }

          if (!err) {
            return resolve(true)
          }

          reject(err)
        }
      )
    })
  }
}

module.exports = S3
