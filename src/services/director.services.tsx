import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetDirectors = () => {
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        const fetchDataDirectors = async () => {
            const directors: any = await axios.get('http://localhost:4001/api/v1/director');
            setDirectors(directors.data);
        };
        fetchDataDirectors();
    }, []);

    return directors;
};
