import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notes from './routes/Notes'
import Note from './routes/Note'
import New from './routes/New'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Notes />
      },
      {
        path: '/note/:id',
        element: <Note />
      },
      {
        path: '/new',
        element: <New />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
