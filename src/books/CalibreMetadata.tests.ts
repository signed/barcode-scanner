import { expect, test } from 'vitest'
import {
  metadataWithMultipleAuthors,
  metadataWithoutTags,
  metadataWithTags,
  refactoringDatabases,
  superNesAVisual,
} from './CalibreMetadataMother.ts'
import { parse } from './CalibreMetadata.ts'

test('parse book title', () => {
  expect(successfulParse(superNesAVisual()).title).toEqual('Super Nes-Super Famicom a Visual')
})

test('parse publisher', () => {
  expect(successfulParse(refactoringDatabases()).publisher).toEqual('Addison Wesley')
})

test('parse isbn', () => {
  expect(successfulParse(superNesAVisual()).identifiers.isbn).toEqual('9780995658622')
})

test('parse authors', () => {
  expect(successfulParse(metadataWithMultipleAuthors()).authors).toEqual(['Scott W. Ambler', 'Pramod J. Sadalage'])
  expect(successfulParse(superNesAVisual()).authors).toEqual(['Bitmap Books'])
})

test('parse tags', () => {
  expect(successfulParse(metadataWithoutTags()).tags).toEqual([])
  expect(successfulParse(metadataWithTags()).tags).toEqual([
    'Computers',
    'General',
    'Database Administration & Management',
    'System Administration',
    'Storage & Retrieval',
    'Programming',
    'Object Oriented',
    'Software Development & Engineering',
    'Data Science',
    'Data Modeling & Design',
  ])
})

function successfulParse(flup: string & { __brand: 'CalibreFetchEbookMetadataOutput' }) {
  const result = parse(flup)
  if (result === 'could not parse') {
    expect.fail('parse failed')
  }
  return result
}
