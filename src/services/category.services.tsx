import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchDataCategories = async () => {
            const categories: any = await axios.get('http://localhost:4001/api/v1/category');
            setCategories(categories.data);
        };
        fetchDataCategories();
    }, []);

    return categories;
};
