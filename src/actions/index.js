'use strict'
import {getJSON} from '../utils/fetch'

export async function getArticle (url) {
  if (url === '/about') {
    url = '/static/about'
  }

  const payload = await getJSON(`/api${url}.json`)

  return {
    type: 'GET_ARTICLE',
    payload
  }
}

export async function getTags () {
  const payload = await getJSON('/api/tag/index.json')
  return {
    type: 'GET_TAGS',
    payload
  }
}

export async function getBlogs (url='/blog/index') {
  const payload = await getJSON(`/api${url}.json`)

  return {
    type: 'GET_BLOGS',
    payload
  }
}
