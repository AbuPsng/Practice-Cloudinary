import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Upload from './pages/Upload.jsx'
import SecureUpload from './pages/SecureUpload.jsx'

const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      {
        path: "upload", element: <Upload />
      },
      {
        path: "secure_upload", element: <SecureUpload />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
