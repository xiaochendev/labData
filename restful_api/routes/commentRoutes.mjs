import express from 'express';
import { comments } from '../data/comments.mjs';

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.json(comments);
    })


export default router;