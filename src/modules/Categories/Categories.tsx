import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetCategories } from '../core/_requests'
import { CategoryInt } from '../core/_models';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

const Categories = () => {
    const { data, isLoading } = useQuery(['get-categories'], GetCategories, { staleTime: Infinity });

    if (isLoading) return <div>Loading...</div>

    return (
        <div className='h-screen grid place-content-center content-center'>
            <div className='flex flex-wrap justify-center items-center gap-5'>
                {
                    data?.map((val: CategoryInt) => (
                        <div key={val.id}>
                            <Link to={`${val.id}`}>
                                <Card id={val.id} name={val.name} />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories