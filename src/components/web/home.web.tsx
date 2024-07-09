import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FilmsHome from './films/films.web';
import FilmsDetailHome from './films/films-detail.web';
import FilmsCategoryHome from './films/films-category.web';
import FilmsSuggestHome from './films/films-suggest.web';
import NarbarHome from '../../common/components/navbar-home';

const HomeWeb: React.FC = () => {

    return (
        <>
            <NarbarHome />
            <Routes>
                <Route path="/home/film" element={<FilmsHome />} />
                <Route path="/home/film/:id" element={<FilmsDetailHome />} />
                <Route path="/home/films/:category" element={<FilmsCategoryHome />} />
                <Route path="home/films/suggest" element={<FilmsSuggestHome />} />
            </Routes>
        </>
    );
};

export default HomeWeb;
