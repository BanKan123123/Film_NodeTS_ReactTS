import axios from 'axios';
import { useEffect, useState } from 'react';
import { Film } from '../components/admin/film/film.interface';

export const GetFilms = async () => {
    const films: any = await axios.get('http://localhost:4001/api/v1/films');
    return films.data;
};

export const GetFilmById = async (id: number) => {
    try {
        const film: any = await axios.get(`http://localhost:4001/api/v1/films/${id}`);
        return film.data.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const DeleteFilm = async (id: number) => {
    try {
        const film: any = await axios.delete(`http://localhost:4001/api/v1/films/delete/${id}`);
        return film.data;
    } catch (err) {
        return err;
    }
};

export const UpdateFilm = async (id: number, data: Film) => {
    try {
        const film: any = await axios.put(`http://localhost:4001/api/v1/films/update/${id}`, data);
        return film.data;
    } catch (err) {
        return err;
    }
};

export const GetFilmsSuggest = () => {
    const [suggests, setSuggests] = useState([]);

    useEffect(() => {
        const fetchDataSuggests = async () => {
            const suggests: any = await axios.get('http://localhost:4001/api/v1/films/suggest');
            setSuggests(suggests.data);
        };
        fetchDataSuggests();
    }, []);

    return suggests;
};
