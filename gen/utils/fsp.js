'use strict'
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

for (const [key, value] of Object.entries(fs)) {
  exports[key] = `${key}Sync` in fs
    ? promisify(value)
    : value
}

function ensureDirSync (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  }
  catch (e) {
    switch (e.code) {
      case 'ENOENT' :
        ensureDirSync(path.dirname(dirPath))
        ensureDirSync(dirPath)
        break

      default:
        const stat = fs.statSync(dirPath)
        if (stat.isDirectory() === false) {
          throw e
        }
    }
  }

}

exports.ensureDirSync = ensureDirSync