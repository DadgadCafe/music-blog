'use strict'
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'dev'
  ? 'http://127.0.0.1:3000' : '/music-blog'

export async function getJSON (url) {
  const {data} = await axios.get(url)
  return data
}
