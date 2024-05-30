import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CameraPicker } from './CameraPicker.tsx'
import { runLogic } from './logic.tsx'
import { VideoPreview } from './VideoPreview.tsx'
import { IsbnNumbers } from './IsbnNumbers.tsx'

await runLogic()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex flex-row ">
      <div className="flex-col">
        <CameraPicker />
      </div>
      <div className="flex-grow">
        <VideoPreview />
      </div>
      <div>
        <IsbnNumbers />
      </div>
    </div>
  </React.StrictMode>,
)
