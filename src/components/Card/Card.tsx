import React, { FC } from 'react';
import { CategoryInt } from '../../modules/core/_models';
import { FaBook } from 'react-icons/fa';

const Card: FC<CategoryInt> = (props) => {
    const { name } = props;
    return (
        <div className='bg-green-500 h-56 w-56 relative transition-all duration-200 rounded-3xl hover:bg-green-800 text-slate-800 hover:text-white overflow-hidden flex flex-col justify-between text-sm hover:font-bold shadow-lg'>
            <div className='flex items-center justify-center pt-10 h-100'>
                <i><FaBook size={70} /></i>
            </div>
            <div className='text-center flex items-center justify-center p-10 text-sm'>
                <span>{name}</span>
            </div>
        </div >
    )
}

export default Card