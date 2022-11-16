import { useQuery } from '@tanstack/react-query';
import React, {  useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { VscRefresh } from 'react-icons/vsc'
import { Route, Routes, useParams, Outlet, useOutletContext } from 'react-router-dom'
import BooksCard from '../../components/BooksCard/BooksCard';
import { useNavigate } from 'react-router-dom'
import Filters from '../../components/Filters/Filters';
import Paginations from '../../components/Paginations/Paginations';
import { BookInt } from '../core/_models';
import { GetBooks } from '../core/_requests';
import Bookmarks from '../Bookmarks/Bookmarks';

type ContextType = {
    page?: number;
    size?: number;
    query: string;
}

const Books = () => {
    const { id } = useParams();
    const {query, page, size} = useOutletContext<ContextType>();
    const params = { categoryId: id, page, size }
    const { data, isLoading, isError, refetch } = useQuery(['get-books', id, size, page], () => GetBooks(params), { staleTime: 60000 });

    const filteredBooks = data?.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase()) || item.authors.find((e: string) => e.toLowerCase().includes(query.toLowerCase()))
    })

    return (
        <div>
                {
                    filteredBooks?.length === 0 && <div className='font-semibold text-white m-10 text-center'>
                        Sorry, We can't find what you're looking for
                    </div>
                }

            {
                isLoading ? <div>Loading...</div> : !isError ?
                <div className='p-5 my-5 grid gap-5 overflow-hidden lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
                    {
                        // eslint-disable-next-line array-callback-return
                        filteredBooks?.map((val: BookInt, index: number) => (
                                <div key={val.id}>
                                    <BooksCard {...val} />
                                </div>
                            )
                            )
                    }
                </div>
                : <div className='flex flex-col gap-2 justify-center items-center my-5 p-5 font-bold'>
                    <span>An error has occured please try again.</span>
                    <span className='bg-green-600 hover:bg-green-500 transition-all duration-200 text-white font-bold flex flex-row gap-2 cursor-pointer rounded-full items-center justify-center p-2 px-5' onClick={() => refetch()}><VscRefresh size={25} className='text-white' /> Refresh</span>
                </div>
            }
        </div>
    )
}

export const BookLayout = () => {
    const [page, setPage] = useState<number | undefined>(1);
    const [size, setSize] = useState<number | undefined | null>(undefined);
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    return (
        <div className='p-5'>
            {/* FILTERS */}
            <div className='w-100 p-5 flex justify-center items-center sm:justify-between'>
                <div className='hidden sm:block'>
                    <span className='p-2 px-5 bg-green-600 hover:bg-green-500 transition-all duration-200 text-white font-bold flex flex-row-reverse gap-2 cursor-pointer rounded-full items-center justify-center' onClick={() => navigate(-1)}>
                        Back
                        <FaArrowLeft size={20} className="text-white" />
                    </span>
                </div>
                <Filters query={query} setQuery={setQuery} />
            </div>
                <Outlet context={{page, size, query}} />
            <div className='border-y p-5'>
                <Paginations page={page} setPage={setPage} size={size} setSize={setSize} />
            </div>
        </div>
    )
} 

export const BooksRoute = () => {
    return (
        <Routes>
            <Route element={<BookLayout />}>
                <Route path=':id' element={<Books />} />
                <Route path='bookmarks' element={<Bookmarks />} />
            </Route>
        </Routes>
    )
}