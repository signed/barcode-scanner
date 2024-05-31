import { useStore } from '../store.ts'
const baseurl = import.meta.env.BASE_URL

const formats = await BarcodeDetector.getSupportedFormats()

export const FormatSelect = () => {
  const { format, changeFormatTo } = useStore()

  return (
    <div>
      <select value={format} onChange={(e) => changeFormatTo(e.target.value as BarcodeFormat)}>
        {formats.map((format) => (
          <option>{format}</option>
        ))}
      </select>
      <div>
        <img alt={format} src={`${baseurl}${formatToImage(format)}`} />
      </div>
    </div>
  )
}

const formatToImage = (format: BarcodeFormat) => {
  switch (format) {
    case 'aztec':
      return 'aztec.gif'
    case 'code_128':
      return 'code-128.gif'
    default:
      return format.replaceAll('_', '-') + '.png'
  }
}
