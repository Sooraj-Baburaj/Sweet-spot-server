import express from "express";
import { getPosts, createPost, likePost, postThumbs, feedPosts} from "../controllers/posts.js";

const router = express.Router();

router.get('/' , getPosts);
router.post('/',createPost);
router.patch('/like/:id', likePost);
router.get('/postThumbs/:id', postThumbs);
router.get('/:feeds', feedPosts)

export default router;