import Category from '../categories/categories.interface';
import Director from '../director/director.interface';

export interface CategoriesOnFilm {
    categoryId: number;
    filmId: number;
    createdAt?: Date;
    updatedAt?: Date;
    category: Category;
}

export interface Film {
    id: number;
    title: string;
    description: string;
    director: Director;
    categoriesOnFilm: CategoriesOnFilm[];
    status: 'CONTINUE' | 'FULL';
    rate: number;
    dateReleased?: Date;
    showTime?: Date;
    national?: string;
}

export interface Suggest {
    id: number;
    film: Film;
    createdAt?: Date;
    updatedAt?: Date;
}
 
export interface propsUpdate {
    film: Film;
}
