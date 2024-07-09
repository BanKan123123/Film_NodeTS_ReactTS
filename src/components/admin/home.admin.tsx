import { Route, Routes } from 'react-router-dom';
import FilmAdmin from './film/film.admin';
import React from 'react';
import DashBoard from '../../common/components/dashboard';
import '../../common/styles/Scss/home.scss';
import UsersAdmin from './users/users.admin';
import Comments from './comments/comments.admin';
import Categories from './categories/categoties.admin';
import Episode from './episode/episode.admin';
import DirectorAdmin from './director/director.admin';

const HomeAdmin: React.FC = () => {
    return (
        <>
            <section className="container-admin">
                <DashBoard />
                <Routes>
                    <Route path="/home/admin/film" element={<FilmAdmin />} />
                    <Route path="/home/admin/comments" element={<Comments />} />
                    <Route path="/home/admin/categories" element={<Categories />} />
                    <Route path="/home/admin/episode" element={<Episode />} />
                    <Route path="/home/admin/director" element={<DirectorAdmin />} />
                    <Route path="/home/admin/users" element={<UsersAdmin />} />
                </Routes>
            </section>
        </>
    );
};
export default HomeAdmin;
