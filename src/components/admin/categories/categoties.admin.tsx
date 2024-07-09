import React from 'react';
import { GetCategories } from '../../../services/category.services';

const Categories: React.FC = () => {
    const categories = GetCategories();

    console.log(categories);
    
    return (
        <>
            <h1>Categories Working</h1>
        </>
    );
};

export default Categories;
