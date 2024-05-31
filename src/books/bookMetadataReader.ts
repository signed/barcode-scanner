import { z } from 'zod'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { CalibreMetadata, parse } from './CalibreMetadata.ts'

const IsbnSchema = z.array(z.string())

const cwd = process.cwd()
const isbnFiles = resolve(cwd, 'cache', 'book-isbn-numbers.json')

const calibreCacheFileFor = (base: string, isbn: string) => {
  return resolve(base, 'cache', 'calibre', `${isbn}.txt`)
}

const calibreOutputFor = (cwd: string, isbn: string): CalibreMetadata | 'failed' => {
  const cacheFile = calibreCacheFileFor(cwd, isbn)
  if (existsSync(cacheFile)) {
    return readFileSync(cacheFile).toString() as CalibreMetadata
  }
  const flup = spawnSync('fetch-ebook-metadata', ['--isbn', isbn])
  if (flup.status !== 0) {
    console.log(isbn, flup.status)
    console.log(flup.stdout.toString())
    console.log(flup.stderr.toString())
    return 'failed'
  }
  const output = flup.stdout.toString()
  writeFileSync(cacheFile, output)
  return output as CalibreMetadata
}

function readIsbnNumbers() {
  console.log(isbnFiles)
  const isbnAsString = readFileSync(isbnFiles).toString()
  return IsbnSchema.parse(JSON.parse(isbnAsString))
}

const all = readIsbnNumbers().map((isbn) => {
  const calibre = calibreOutputFor(cwd, isbn)
  const parsed = calibre === 'failed' ? 'failed' : parse(calibre)
  return { isbn, parsed }
})
const summary = resolve(cwd, 'cache', 'summary.json')
writeFileSync(summary, JSON.stringify(all, null, 2))
