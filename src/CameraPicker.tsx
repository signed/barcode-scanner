import { useStore } from './store.ts'
import { ReactNode } from 'react'

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

type ToggleButtonProps = {
  toggled: boolean
  children: ReactNode
  onClick?: () => void
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { toggled, children, onClick } = props
  if (toggled) {
    return (
      <button
        onClick={onClick}
        className="border border-transparent bg-blue-500 px-4 py-2 font-semibold text-white hover:border-blue-500 hover:bg-transparent hover:text-blue-700"
      >
        {children}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      className="border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
    >
      {children}
    </button>
  )
}
