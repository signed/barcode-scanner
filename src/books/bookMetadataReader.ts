import { spawnSync } from 'node:child_process'

const flup = spawnSync('fetch-ebook-metadata', ['--isbn', '9780321774514'])
console.log(flup.stdout.toString())
