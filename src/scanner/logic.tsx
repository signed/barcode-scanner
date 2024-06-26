import { useStore } from '../store.ts'
import { detectBarcode } from './detectBarcode.ts'
import { addScannedData } from '../useScannedDataStorage.ts'
import { beep } from './beep.ts'
import { closeMediaSteam } from '../mediaStreams.ts'

async function readFrame(reader: ReadableStreamDefaultReader<VideoFrame>) {
  const { value: frame } = await reader.read()
  // value = frame
  if (frame) {
    const bitmap = await createImageBitmap(frame)
    frame.close()
    return bitmap
  }
  return 'no-frame'
}

export async function runLogic() {
  useStore.subscribe(
    (state) => state.camera.current,
    async (cur, _prev) => {
      const state = useStore.getState()
      if (state.mediaStream !== 'no-stream') {
        state.mediaStream.getTracks().forEach((track) => track.stop())
      }
      if (cur === 'no-selection') {
        state.switchMediaStream('no-stream')
        return
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: cur.deviceId,
          groupId: cur.groupId,
        },
      })
      state.switchMediaStream(mediaStream)
    },
  )

  useStore.subscribe(
    (state) => state.mediaStream,
    async (cur) => {
      const state = useStore.getState()
      if (state.capture.reader !== 'no-reader') {
        await state.capture.reader.cancel()
      }

      if (cur === 'no-stream') {
        state.switchReader('no-reader')
        return
      }

      const [track] = cur.getVideoTracks()
      const processor = new MediaStreamTrackProcessor({ track })
      const reader = processor.readable.getReader()

      state.switchReader(reader)
    },
  )

  useStore.subscribe(
    (state) => state.capture.reader,
    async (cur) => {
      const state = useStore.getState()
      if (state.capture.intervalIdentifier !== null) {
        globalThis.clearInterval(state.capture.intervalIdentifier)
      }
      if (cur === 'no-reader') {
        return
      }

      const intervalIdentifier = globalThis.setInterval(async () => {
        console.log('start scan')
        const image = await readFrame(cur)
        if (image === 'no-frame') {
          return
        }
        const isbnNumbers = await detectBarcode(useStore.getState().format, image)
        if (isbnNumbers.length > 0) {
          beep()
        }
        isbnNumbers.forEach((isbn) => addScannedData(isbn))
      }, 1000)
      state.newIntervalIdentifier(intervalIdentifier)
    },
  )

  // ask for permission from the user
  // has to be done before enumerating devices to get device ids and label
  closeMediaSteam(await navigator.mediaDevices.getUserMedia({ video: true }))
  const deviceInfos = await navigator.mediaDevices.enumerateDevices()
  const cameras = deviceInfos.filter((info) => info.kind === 'videoinput')
  const state = useStore.getState()
  state.availableCameras(cameras)
  //state.selectCamera(cameras[0])
}
