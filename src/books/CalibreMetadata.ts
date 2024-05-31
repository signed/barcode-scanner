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
  const authorsKv = keyAndValues.find((kv) => kv.key === 'Author(s)')
  const tagsKv = keyAndValues.find((kv) => kv.key === 'Tags')
  const publisherKv = keyAndValues.find((kv) => kv.key === 'Publisher')

  if (titleKv === undefined || identifiersKv === undefined || authorsKv === undefined || publisherKv === undefined) {
    return 'could not parse'
  }

  const flup = identifiersKv.value.split(',').map((part) => splitIntoKeyAndValue(part))
  const isbn = flup.find((kv) => kv.key === 'isbn')

  if (isbn === undefined) {
    return 'could not parse'
  }
  const authors = authorsKv.value.split('&').map((part) => part.trim())

  return {
    title: titleKv.value,
    authors,
    publisher: publisherKv.value,
    tags: tagsKv === undefined ? [] : tagsKv.value.split(',').map((tag) => tag.trim()),
    identifiers: {
      isbn: isbn.value,
    },
  }
}
