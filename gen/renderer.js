'use strict'
const marked = require('marked')
// const highlight = require('highlight.js')

const renderer = new marked.Renderer()

renderer.link = function (href='', title='', text='') {
  return `<a href="${href}" target="_blank">${text}</a>`
}

renderer.heading = function (text, level) {
  return `<h${level}>${text}</h${level}>`
}

renderer.image = function (href, title, text) {
  return `<img src="${href}" alt="${text}"/><p class="caption">${text}</p>`
}

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

function contentToHTML (content) {
  return marked(content)
}

module.exports = contentToHTML
