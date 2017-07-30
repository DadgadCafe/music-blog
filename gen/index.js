const fsp = require('./utils/fsp')
const {parse} = require('./parser')
const path = require('path')

const SRC_PATH = path.join(__dirname, '../source')
const DIST_PATH = path.join(__dirname, '../dist/api')

async function genBlogs (mdJSONs, to) {
  const metas = mdJSONs.map(({meta}) => meta)

  const postPath = path.join(to, 'blog')
  fsp.ensureDirSync(postPath)

  return fsp.writeFile(
    path.join(postPath, 'index.json'),
    JSON.stringify(metas),
    'utf-8'
  )
}

async function genTags (mdJSONs, to) {
  const tagIndex = mdJSONs.reduce(
    (acc, {meta}) => {
      return meta.tags && meta.tags.length
        ? meta.tags.reduce(
          (ac, tag) => {
            ac[tag] = tag in ac
              ? [meta, ...ac[tag]]
              : [meta]
            return ac
          },
          acc
        )
        : acc
    },
    {}
  )

  const allTag = Object.keys(tagIndex)

  const tagPath = path.join(to, 'tag')
  fsp.ensureDirSync(tagPath)

  return Promise.all([
    fsp.writeFile(
      path.join(tagPath, 'index.json'),
      JSON.stringify(allTag),
      'utf-8'
    ),
    ...allTag.map(
      (tag) =>
        fsp.writeFile(
          path.join(tagPath, `${tag}.json`),
          JSON.stringify(tagIndex[tag]),
          'utf-8'
        )
    )
  ])
}

async function genFile (from, to) {
  const file = await fsp.readFile(from, 'utf-8')
  const isMd = path.extname(from) === '.md'

  if (isMd) {
    const mdJSON = parse(file)
    mdJSON.meta.url = path.parse(from).name
    // don't wait this
    fsp.writeFile(
      path.join(path.dirname(to), `${mdJSON.meta.url}.json`),
      JSON.stringify(mdJSON),
      'utf-8'
    )
    return mdJSON
  }

  // don't wait this
  fsp.writeFile(to, file, 'utf-8')
  return undefined
}

async function genJSONs (from, to, isNeeded) {
  const isDir = fsp.statSync(from).isDirectory()

  if (isDir) {
    fsp.ensureDirSync(to)

    const fileNames = await fsp.readdir(from)

    const mdJSONs = await Promise.all(
      fileNames.map(fileName =>
        genJSONs(
          path.join(from, fileName),
          path.join(to, fileName)
        )
        // exclude _static file
          .then(posts =>
            fileName[0] === '_' ? [] : posts
          )
      )
    )

    const reducedJSONs = Array.prototype
      .concat(...mdJSONs)
      .filter(m => m !== undefined)

    return reducedJSONs
  }

  return genFile(from, to)
}

async function gen (from, to) {
  const mdJSONs = await genJSONs(from, to, false)

  return Promise.all([
    genBlogs(mdJSONs, to),
    genTags(mdJSONs, to)
  ])
}

gen(SRC_PATH, DIST_PATH)
  .then(_ => console.log('done!'))