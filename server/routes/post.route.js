import express from 'express';
import { deletePost, getPostInfo, postInfo } from '../controllers/post.controllers.js';

const postRouter = express.Router();

postRouter.post('/post', postInfo);
postRouter.get('/get', getPostInfo);
postRouter.delete('/delete/:_id', deletePost);

export default postRouter