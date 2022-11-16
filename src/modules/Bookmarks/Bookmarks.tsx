import React, {useState} from 'react'
import { BookInt } from '../core/_models';
import BooksCard from '../../components/BooksCard/BooksCard';

const Bookmarks = () => {
    const [item, setItem] = useState(JSON.parse(localStorage.getItem('bookmarks')!))
    window.addEventListener('storage', () => {
        setItem(JSON.parse(localStorage.getItem('bookmarks')!))
    })

    console.log(item);

    if (item.length === 0) {
        return (
            <div className='text-center my-10'>
                <span className='font-bold text-xl'>Your Bookmark is empty</span>
            </div>
        )
    }

    return (
        <div className='p-5 grid gap-5 overflow-hidden lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
            {
                item?.map((val: BookInt) => (
                    <div key={val.id}>
                        <BooksCard {...val} />
                    </div>
                ))
            }
        </div>
    )
}

export default Bookmarks