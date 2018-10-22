require('dotenv').config()

const path = require('path')
const fs = require('fs')

const program = require('commander')

const Zip = require('./zip')
const S3 = require('./s3')
const Lambda = require('./lambda')
const config = require('./config')

program
  .version('0.0.1', '-v, --version')
  .option('-z, --zip', 'Zip code for lambda')
  .option('-d, --deploy', 'Deploy zip to S3 bucket')
  .option('-u, --updateCode', 'Update lambda code')
  .parse(process.argv)

function zipCode() {
  return Zip(config.LAMBDA_ZIP_FILENAME)
}

function deploy() {
  const s3 = new S3(config.BUCKET_NAME)

  return s3.uploadFile(config.LAMBDA_ZIP_FILENAME, path.join(__dirname, config.LAMBDA_ZIP_FILENAME))
}

function updateCode() {
  const lambda = new Lambda(
    config.LAMBDA_FUNCTION_NAME,
    config.REGION
  )

  return lambda.updateFunctionCode(
    config.LAMBDA_ZIP_FILENAME,
    config.BUCKET_NAME
  )
}

function removeZip() {
  fs.unlinkSync(path.join(__dirname, config.LAMBDA_ZIP_FILENAME))
}

if (program.deploy) {
  zipCode()
    .then(() => deploy())
    .then(() => updateCode())
    .then(() => removeZip())
    .then(() => console.log('App deployed!'))
}
else if (program.zip) {
  zipCode()
    .then(() => console.log('Zip completed!'))
}
else if (program.updateCode) {
  updateCode()
    .then(() => console.log('Lambda code updated!'))
}
