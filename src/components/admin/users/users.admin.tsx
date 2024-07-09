import React from 'react';
import { GetUsers } from '../../../services/users.services';

const UsersAdmin: React.FC = () => {
    const users = GetUsers();

    console.log(users);
    return (
        <>
            <h1>Users Working</h1>
        </>
    );
};

export default UsersAdmin;
