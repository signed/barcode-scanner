export const closeMediaSteam = (stream: MediaStream) => {
  stream.getTracks().forEach((track) => track.stop())
}
