const fs = require('fs')
const path = require('path')

const archiver = require('archiver')

module.exports = (fileName) => {
  return (
    new Promise((resolve, reject) => {
      const zipFileName = path.join(__dirname, fileName)

      const output = fs.createWriteStream(zipFileName)

      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      })

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on('close', () => {
        console.log(`${archive.pointer()} total bytes`)
        resolve()
      })

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', () => {
        console.log('Data has been drained')
      })

      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          // log warning
        }
        else {
          reject(err)
        }
      })

      archive.on('error', (err) => {
        reject(err)
      })

      archive.pipe(output)

      archive.directory(path.join(__dirname, '../src/'), 'src')
      archive.directory(path.join(__dirname, '../node_modules/'), 'node_modules')

      archive.finalize()
    })
  )
}
