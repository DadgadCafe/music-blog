'use strict'
const contentToHTML = require('./renderer')
const yaml = require('js-yaml')

// --- or ;;;
const rMD_META_SEP = /^(-{3,}|;{3,})/
// --- meta --- content
const rMD_META_PREFIX = /^(-{3,}|;{3,})\n([\s\S]+?)\n\1(?:$|\n([\s\S]*)$)/
// meta --- content
const rMD_META = /^([\s\S]+?)\n(-{3,}|;{3,})(?:$|\n([\s\S]*)$)/

function split (md) {
  const type = typeof md

  if (type !== 'string') {
    throw new TypeError(`string expected, not ${type}. `)
  }

  if (rMD_META_PREFIX.test(md)) {
    return splitPrefixMeta(md)
  }
  if (rMD_META.test(md)) {
    return splitMeta(md)
  }

  return {content: md}
}

function splitPrefixMeta (md) {
  const match = md.match(rMD_META_PREFIX)

  return {
    meta: match[2],
    content: match[3] || '',
    separator: match[1],
    prefixSeparator: true
  }
}

function splitMeta (md) {
  if (rMD_META_SEP.test(md)) {
    return {
      content: md
    }
  }

  const match = md.match(rMD_META)

  return {
    meta: match[1],
    content: match[3] || '',
    separator: match[2],
    prefixSeparator: false
  }
}

function mdToJSON (md) {
  const {meta, content} = split(md)

  const metaJSON = meta !== undefined
    ? metaToJSON(meta)
    : undefined

  const contentHTML = contentToHTML(content)

  return {
    meta: metaJSON,
    content: contentHTML
  }
}

function metaToJSON (meta) {
  try {
    const metaJSON = yaml.load(meta)

    if (!metaJSON['date']) {
      metaJSON.date = new Date()
    }

    return metaJSON
  } catch (e) {
    console.log(`metadata format error.`)
  }
}

module.exports = {
  parse: mdToJSON,
  split
}