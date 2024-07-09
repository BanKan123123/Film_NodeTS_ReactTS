import { Navigate, useLocation } from 'react-router-dom';
import HomeAdmin from './admin/home.admin';
import HomeWeb from './web/home.web';
import PageNotFound from '../common/components/404';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './auth/login.auth';

const HomeLayout: React.FC = () => {
    const location = useLocation();

    const routesAuth = ['/login/', '/login', '/register/', '/register'];
    const routesAdmin = ['/home/admin', '/home/admin/film', '/home/admin/director', '/home/admin/comments', '/home/admin/categories', '/home/admin/episode', '/home/admin/users', '/home/admin/film/suggest', '/home/admin/film/completed'];
    const routesWeb = ['/home/film', '/home/film/:id', '/home/films/:category', '/home/films/suggest', '/home/comments', '/home/comments/:id', '/home/user/:id', '/home/films/completed'];

    if (routesAdmin.find((el) => el === location.pathname)) {
        return <HomeAdmin></HomeAdmin>;
    } else if (routesWeb.find((el) => el === location.pathname)) {
        return <HomeWeb></HomeWeb>;
    } else if (routesAuth.find((el) => el === location.pathname)) {
        return <Login />;
    } else if (location.pathname === '/') {
        return <Navigate to="/home/film" />;
    } else {
        return <PageNotFound></PageNotFound>;
    }
};
export default HomeLayout;
