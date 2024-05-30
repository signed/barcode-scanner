import { type ReactNode } from 'react'

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
