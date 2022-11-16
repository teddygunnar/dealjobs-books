import React, { FC, useState } from 'react'
import { BookInt } from '../../modules/core/_models';

const BooksCard: FC<BookInt> = (props) => {
    const { title, cover_url, authors, id} = props;

    const [bookmarked, setBookmarked] = useState(false);
    const [render, setRender] = useState(false);

    const updateBookmarkStats = () => {
        const bookmarkArr = JSON.parse(localStorage.getItem('bookmarks')!) as BookInt[]
        const findId = bookmarkArr?.find((e) => e.id === id);

        if (findId) {
            setBookmarked(true)
        } else {
            setBookmarked(false)
        }
    }

    React.useEffect(() => {
        let render = true;
        if (render) updateBookmarkStats()

        return () => {
            render = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[render])

    const bookmark = (val: BookInt) => {
        let arr = [];
        const currentBookmark = localStorage.getItem('bookmarks');
        arr = currentBookmark !== null ? JSON.parse(currentBookmark) : [];
        const findDuplicate = arr.find((e: BookInt) => e.id === val.id);

        if (findDuplicate) {
            return alert("This book's is already added to your bookmark")
        } else {
         alert('Added to bookmark')
        }
        arr.push(val);
        localStorage.setItem('bookmarks', JSON.stringify(arr));
        setRender((prev) => !prev)
    }
    const removeBookmark = (val: BookInt) => {
        let arr = []
        const currentBookmark = localStorage.getItem('bookmarks');
        arr = JSON.parse(currentBookmark!);
        let filteredArr = arr.filter((o: BookInt) => o.id !== val.id);
        localStorage.setItem('bookmarks', JSON.stringify(filteredArr));
        alert('removed from bookmark')
        window.dispatchEvent(new Event("storage"));
        setRender((prev) => !prev)
    }
    
    return (
        <div className='overflow-hidden cursor-pointer hover:bg-green-500/25 transition-all duration-150 p-5 text-center rounded-xl'>
            <img src={cover_url} alt={`${title}.jpg`} width='100%' className="object-scale-down sm:object-fill shadow-sm w-100 border-2 border-green-500 rounded-lg overflow-hidden" />
            <div className='my-2 flex items-center justify-between gap-1'>
                <div className='flex-wrap flex gap-1 items-center'>
                    {authors.map((val: string, index: number) => (
                        <span className='font-semibold text-[12px] text-white border p-0.5' key={index}>{val}</span>
                    ))}
                </div>
                {
                    !bookmarked
                    ?
                    <span onClick={() => bookmark(props)} className="border px-2 py-0.5 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold">Add</span>
                    :
                    <span onClick={() => removeBookmark(props)} className="border px-2 py-0.5 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold">Remove</span>
                }
            </div>

            <div className='text-center p-5 truncate text-white'>
                <span className='text-xl font-thin'>
                    {title}
                </span>
            </div>
        </div>
    )
}

export default BooksCard