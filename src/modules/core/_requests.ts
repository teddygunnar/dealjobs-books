import axios from 'axios';
import { BookInt, CategoryInt } from './_models';

export const GetCategories = async () => {
    const { data } = await axios.get<CategoryInt[]>('/fee-assessment-categories'); 
    return data;
}

export const GetBooks = async (props: {categoryId?: string, page?: number, size?: number | null}) => {
    const { data } = await axios.get<BookInt[]>('/fee-assessment-books', {
        params: {...props}
    }); 
    return data;
}