'use strict'
const baseURL = process.env.NODE_ENV === 'dev' ? 'http://127.0.0.1:3000' : ''

export async function getJSON (url) {
  const req = new Request(
    baseURL + url,
    {
      method: 'GET',
      cache: 'reload'
    }
  )

  const res = await fetch(req)
  const data = await res.json()

  return data
}
