import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { LsContextProvider } from './context/LsContext';
import { BookmarksContextProvider } from './context/BookmarksContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LsContextProvider>
      <BookmarksContextProvider>
        <App />
      </BookmarksContextProvider>
    </LsContextProvider>
  </React.StrictMode>
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
