export async function detectBarcode(format: BarcodeFormat, image: ImageBitmap) {
  if (!('BarcodeDetector' in globalThis)) {
    console.log('Barcode Detector is not supported by this browser.')
    return []
  }
  const barcodeDetector = new BarcodeDetector({
    formats: [format],
  })
  try {
    const detectedBarcodes = await barcodeDetector.detect(image)
    return detectedBarcodes.map((code) => code.rawValue)
  } catch (e) {
    console.log(e)
    return []
  }
}
