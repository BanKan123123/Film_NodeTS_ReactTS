import axios from 'axios';
import { useEffect, useState } from 'react';

export const apiClient = axios.create({
    baseURL: 'http://localhost:4001/api/v1/'
});

apiClient.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.header.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const GetUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchDataUsers = async () => {
            const users: any = await axios.get('http://localhost:4001/api/v1/users');
            setUsers(users.data);
        };
        fetchDataUsers();
    }, []);

    return users;
};

export const LoginUser = async (username: string, password: string) => {
    const [user, setUser] = useState();
    axios
        .post('http://localhost:4001/api/v1/users/login', { username, password }, { headers: { 'Content-Type': 'application/json' } })
        .then((res: any) => setUser(res))
        .catch(function (error) {
            console.log(error);
        });
    return user;
};
