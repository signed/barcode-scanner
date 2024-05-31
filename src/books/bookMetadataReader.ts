import { spawnSync } from 'node:child_process'

const flup = spawnSync('fetch-ebook-metadata', ['--isbn', '9780995658622'])
console.log(flup.stdout.toString())
