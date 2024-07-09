import React from 'react';
import { GetDirectors } from '../../../services/director.services';
import Director from './director.interface';
import { Tag } from 'antd';
import { Film } from '../film/film.interface';

const DirectorAdmin: React.FC = () => {
    const directors: Director[] = GetDirectors();

    console.log(directors);
    return (
        <>
            <h1>Director Working</h1>

            <section className="film-container">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Index</th>
                            <th scope="col">Name</th>
                            <th scope="col">Films</th>
                            <th scope="col">Created at</th>
                            <th scope="col" colSpan={3}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {directors.map((diretor: Director) => (
                            <tr key={diretor.id}>
                                <th scope="row">{diretor.id}</th>
                                <td>{diretor.name}</td>
                                <td>
                                    {diretor.film.map((film: Film) => (
                                        <div key={film.id}>
                                            <Tag>{film.title}</Tag>
                                        </div>
                                    ))}
                                </td>
                                <td>{diretor.created_at} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default DirectorAdmin;
