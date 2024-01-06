import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './routes/rootRoute'
import { RouterProvider } from '@tanstack/react-router'

// import css
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
