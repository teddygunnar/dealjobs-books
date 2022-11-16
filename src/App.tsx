import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';
import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={'Loading...'}>
                    <AppRoutes />
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App