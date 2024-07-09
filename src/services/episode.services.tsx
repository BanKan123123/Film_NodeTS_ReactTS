import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetEpisodes = () => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchDataEpisodes = async () => {
            const episodes = await axios.get('http://localhost:4001/api/v1/category');
            setEpisodes(episodes.data);
        };
        fetchDataEpisodes();
    }, []);
    return episodes;
};
