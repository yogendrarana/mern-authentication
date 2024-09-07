import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import css
import './main.css'

// import app
import { router } from './routes/rootRoute';

// query client
const queryClient = new QueryClient();

// main render
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />

            <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
        </QueryClientProvider>
    </React.StrictMode>,
);
