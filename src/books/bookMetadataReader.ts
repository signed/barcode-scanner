import { z } from 'zod'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const IsbnSchema = z.array(z.string())

const cwd = process.cwd()
const isbnFiles = resolve(cwd, 'cache', 'isbn-numbers.json')

const calibreCacheFileFor = (base: string, isbn: string) => {
  return resolve(base, 'cache', 'calibre', `${isbn}.txt`)
}

const calibreOutputFor = (cwd: string, isbn: string) => {
  const cacheFile = calibreCacheFileFor(cwd, isbn)
  if (existsSync(cacheFile)) {
    console.log('cache hit')
    return readFileSync(cacheFile)
  }
  const flup = spawnSync('fetch-ebook-metadata', ['--isbn', isbn])
  if (flup.status !== 0) {
    throw new Error('check what wrong')
  }
  const output = flup.stdout.toString()
  writeFileSync(cacheFile, output)
  return output
}

function readIsbnNumbers() {
  console.log(isbnFiles)
  const isbnAsString = readFileSync(isbnFiles).toString()
  return IsbnSchema.parse(JSON.parse(isbnAsString))
}

const isbnNumbers = readIsbnNumbers()
isbnNumbers.forEach((isbn) => calibreOutputFor(cwd, isbn))
