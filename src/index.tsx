import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CameraPicker } from './CameraPicker.tsx'
import { runLogic } from './scanner/logic.tsx'
import { VideoPreview } from './VideoPreview.tsx'
import { ScannedData } from './ScannedData.tsx'
import { FormatSelect } from './scanner/FormatSelect.tsx'

await runLogic()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex flex-row ">
      <div className="w-1/4 flex-col">
        <CameraPicker />

        <FormatSelect />
      </div>
      <div className="flex-grow">
        <VideoPreview />
      </div>
      <div className="w-1/4">
        <ScannedData />
      </div>
    </div>
  </React.StrictMode>,
)
