const fs = require('fs')
const path = require('path')

const [title, ...tags] = process.argv.slice(2)
const tagStr = tags
  .map(tag => `  - ${tag}`)
  .join('\n')

const meta = `title: '${title}'
date: ${new Date().toLocaleString()}
tags:
${tagStr}
---

writing here...
`

const outPath = path.join(__dirname, `../source/blog/${title}.md`)
fs.writeFileSync(
  outPath,
  meta,
  'utf-8'
)

console.log(`generated: ${title}.md
@ ${outPath}`)