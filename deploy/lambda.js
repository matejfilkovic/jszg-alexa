const AWS = require('aws-sdk')

// This class requires lambda:UpdateFunctionCode action.
class Lambda {
  constructor(functionName, region) {
    this.lambda = new AWS.Lambda({
      region,
      params: { FunctionName: functionName }
    })
  }

  updateFunctionCode(fileName, bucketName) {
    return new Promise((resolve, reject) => {
      const params = {
        Publish: true,
        S3Bucket: bucketName,
        S3Key: fileName
      }

      this.lambda.updateFunctionCode(params, (err, data) => {
        if (err) return reject(err)

        resolve(data)
      })
    })
  }
}

module.exports = Lambda
