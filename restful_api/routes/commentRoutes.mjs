import express from 'express';
import { comments } from '../data/comments.mjs';

const router = express.Router();

// GET /comments
    // Note that we do not have any comments data yet; that is okay! Make sure that you create a place to store comments, but you do not need to populate that data.
// POST /comments
    // When creating a new comment object, it should have the following fields:
    // id: a unique identifier.
    // userId: the id of the user that created the comment.
    // postId: the id of the post the comment was made on.
    // body: the text of the comment.
// GET /comments/:id
    // Retrieves the comment with the specified id.
// PATCH /comments/:id
    // Used to update a comment with the specified id with a new body.
// DELETE /comments/:id
    // Used to delete a comment with the specified id.
// GET /comments?userId=<VALUE>
    // Retrieves comments by the user with the specified userId.
// GET /comments?postId=<VALUE>
    // Retrieves comments made on the post with the specified postId.

router
    .route('/')
    .get((req, res) => {
        res.json(comments);
    })


export default router;