export type CalibreMetadata = string & { __brand: 'CalibreFetchEbookMetadataOutput' }

function splitIntoKeyAndValue(one: string) {
  const keyValueSeparatorPosition = one.indexOf(':')
  const key = one.slice(0, keyValueSeparatorPosition).trim()
  const value = one.slice(keyValueSeparatorPosition + 1).trim()
  return { key, value }
}

export const parse = (metadata: CalibreMetadata) => {
  const rows = metadata.split('\n')
  const keyAndValues = rows.map((row) => splitIntoKeyAndValue(row))

  const titleKv = keyAndValues.find((kv) => kv.key === 'Title')
  const identifiersKv = keyAndValues.find((kv) => kv.key === 'Identifiers')

  if (titleKv === undefined || identifiersKv === undefined) {
    return 'could not parse'
  }

  const flup = identifiersKv.value.split(',').map((part) => splitIntoKeyAndValue(part))

  const isbn = flup.find((kv) => kv.key === 'isbn')
  if (isbn === undefined) {
    return 'could not parse'
  }

  return {
    title: titleKv.value,
    identifiers: {
      isbn: isbn.value,
    },
  }
}
