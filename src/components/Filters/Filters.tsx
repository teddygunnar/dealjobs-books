import React, { FC, Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom';

const Filters: FC<{ query: string, setQuery: Dispatch<SetStateAction<string>>}> = (props) => {
    const { query, setQuery } = props;
    return (
        <div className='flex flex-row items-center gap-5 flex-wrap justify-center'>
            <div className=''>
                <input type={'text'} placeholder='Search...' className='rounded-full px-5 py-2 bg-gray-700 text-white leading-tight focus:outline-none focus:border-purple-500 appearance-none border-green-500 w-100 w-max' value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div>
                <Link to="/categories/bookmarks">
                    <span className='p-2 px-5 bg-green-600 rounded-full text-white font-bold cursor-pointer hover:bg-green-500 transition-all duration-200'>Bookmarks</span>
                </Link>
            </div>
        </div>
    )
}

export default Filters