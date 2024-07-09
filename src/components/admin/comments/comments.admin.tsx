import React from 'react';
import { GetComments } from '../../../services/comment.services';

const Comments: React.FC = () => {
    const comments = GetComments();

    console.log(comments);

    return (
        <>
            <h1>Comments Working</h1>
        </>
    );
};

export default Comments;
