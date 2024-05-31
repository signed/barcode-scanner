import { expect, test } from 'vitest'
import { superNesAVisual } from './CalibreMetadataMother.ts'
import { parse } from './CalibreMetadata.ts'

test('parse book title', () => {
  expect(successfulParse(superNesAVisual()).title).toEqual('Super Nes-Super Famicom a Visual')
})

test('parse isbn', () => {
  expect(successfulParse(superNesAVisual()).identifiers.isbn).toEqual('9780995658622')
})

function successfulParse(flup: string & { __brand: 'CalibreFetchEbookMetadataOutput' }) {
  const result = parse(flup)
  if (result === 'could not parse') {
    expect.fail('parse failed')
  }
  return result
}
