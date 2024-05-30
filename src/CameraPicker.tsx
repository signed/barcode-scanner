import { useStore } from './store.ts'
import { ToggleButton } from './generic/ToggleButton.tsx'

export const CameraPicker = () => {
  const { available, current } = useStore((state) => state.camera)
  const selectCamera = useStore((state) => state.selectCamera)
  return (
    <ul>
      {available.map((camera) => {
        const selected = current !== 'no-selection' && camera.deviceId === current.deviceId
        return (
          <li key={camera.deviceId}>
            <ToggleButton toggled={selected} onClick={() => selectCamera(camera)}>
              {camera.label}
            </ToggleButton>
          </li>
        )
      })}
    </ul>
  )
}
