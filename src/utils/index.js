'use strict'
export function formatDate (timeStr) {
  return new Date(timeStr).toLocaleString()
}