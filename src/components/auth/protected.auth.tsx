import React, { useEffect, useState } from 'react';
import { apiClient } from '../../services/users.services';

const ProtectedAuth: React.FC = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await apiClient.get('/users/protected');
                setMessage(response.data.message);
            } catch (err) {
                alert('Failed to fetch protected data');
            }
        };
        fetchProtectedData();
    }, []);

    return (
        <>
            <div>
                <h1>Protected Route</h1>
                <p>{message}</p>
            </div>
        </>
    );
};

export default ProtectedAuth;
