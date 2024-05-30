import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  scannedData: string[]
}

export const useScannedDataStorage = create<State>()(
  persist(
    immer((_set) => ({
      scannedData: [],
    })),
    {
      name: 'isbn-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const clearScannedData = () => {
  useScannedDataStorage.setState((state) => {
    state.scannedData = []
  })
}

export const addScannedData = (scannedData: string) => {
  const state = useScannedDataStorage.getState()
  if (state.scannedData.includes(scannedData)) {
    return
  }
  useScannedDataStorage.setState((state) => {
    state.scannedData.push(scannedData)
  })
}
