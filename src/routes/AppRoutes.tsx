import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BooksRoute } from '../modules/Books/Books';

const AppRoutes = () => {
    const Categories = lazy(() => import('../modules/Categories/Categories'));
    return (
        <div className='bg-slate-800 min-h-screen text-green-500'>
            <Routes>
                <Route path='*' element={<Navigate to='/categories' />} />
                <Route path='/categories/*' element={<BooksRoute />} />
                <Route path='/categories' element={<Categories />} />
            </Routes>
        </div>
    )
}

export default AppRoutes