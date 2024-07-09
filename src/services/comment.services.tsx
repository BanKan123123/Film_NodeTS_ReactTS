import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetComments = () => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const fetchDataComments = async () => {
            const comments: any = await axios.get('http://localhost:4001/api/v1/category');
            setComments(comments);
        };
        fetchDataComments();
    }, []);
    return comments;
};
